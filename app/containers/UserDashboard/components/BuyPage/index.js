import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Stats from './Stats';

export default class BuyPage extends Component {
  static propTypes = {
    showToastSuccess: PropTypes.func.isRequired,
    showToastError: PropTypes.func.isRequired,
    globalData: PropTypes.object.isRequired,
    userDashboard: PropTypes.object.isRequired,
    performEstimatingTrade: PropTypes.func.isRequired,
  }

  state = {
    fromAssetAmount: 0.0,
    toAssetAmount: 0.0,
    fromAssetType: 'eth',
    toAssetType: 'btc',
    fromAssetDropdownOpen: false,
    toAssetDropdownOpen: false
  };

  onFromAssetAmountChange = ({ target: { value: fromAssetAmount } }) => {
    this.setState({
      fromAssetAmount: (fromAssetAmount < 0 || isNaN(fromAssetAmount)) ? 0 : fromAssetAmount
    }, this.updateLocalValues.bind(this, 'fromAmount'));
  }
  onToAssetAmountChange = ({ target: { value: toAssetAmount } }) => {
    this.setState({
      toAssetAmount: (toAssetAmount < 0 || isNaN(toAssetAmount)) ? 0 : toAssetAmount
    }, this.updateLocalValues.bind(this, 'toAmount'));
  }

  updateLocalValues = direction => {
    const {
      fromAssetAmount,
      toAssetAmount,
      fromAssetType,
      toAssetType
    } = this.state;
    const {
      userDashboard: {
        allAssets
      }
    } = this.props;
    const toAsset = allAssets.find(a => a.ticker === toAssetType);
    const fromAsset = allAssets.find(a => a.ticker === fromAssetType);
    if (direction === 'fromAmount') {
      const newToAssetPrice = (() => {
        try {
          const numerator = Number(fromAssetAmount);
          const denominator = Number(toAsset.exchangeRates[fromAsset.ticker] ? toAsset.exchangeRates[fromAsset.ticker].ask : 0);
          return numerator / denominator;
        } catch (e) {
          return 0;
        }
      })();
      this.setState({
        toAssetAmount: isFinite(newToAssetPrice) ? newToAssetPrice || 0 : 0
      });
    } else {
      const newFromAssetPrice = Number(
        Number(toAssetAmount) * (
          toAsset.exchangeRates[fromAsset.ticker] ?
            Number(toAsset.exchangeRates[fromAsset.ticker].bid) : 0
        )
      );
      this.setState({
        fromAssetAmount: newFromAssetPrice || 0
      });
    }
  }

  fromAssetDropdownToggle = evt => {
    const { value } = evt.target;
    const fromAssetType = value || null;
    let toAssetType;
    if (fromAssetType && this.state.toAssetType === fromAssetType) {
      toAssetType = fromAssetType === 'btc' ? 'eth' : 'btc';
    }

    const cb = this.updateLocalValues.bind(this, 'fromAmount');

    this.setState(prevState => ({
      fromAssetDropdownOpen: !prevState.fromAssetDropdownOpen,
      ...(fromAssetType ? { fromAssetType } : {}),
      ...(toAssetType ? { toAssetType } : {})
    }), fromAssetType ? cb : null);
  }

  toAssetDropdownToggle = evt => {
    const { value } = evt.target;
    const toAssetType = value || null;
    let fromAssetType;
    if (toAssetType && this.state.fromAssetType === toAssetType) {
      fromAssetType = toAssetType === 'btc' ? 'eth' : 'btc';
    }

    const cb = this.updateLocalValues.bind(this, 'toAmount');

    this.setState(prevState => ({
      toAssetDropdownOpen: !prevState.toAssetDropdownOpen,
      ...(fromAssetType ? { fromAssetType } : {}),
      ...(toAssetType ? { toAssetType } : {})
    }), toAssetType ? cb : null);
  }

  estimateTrade = () => {
    const {
      fromAssetAmount,
      toAssetAmount,
      fromAssetType,
      toAssetType
    } = this.state;
    const { performEstimatingTrade, userDashboard } = this.props;
    const { allAssets } = userDashboard;

    const fromAssetId = allAssets.find(({ ticker }) => ticker === fromAssetType).id;
    const toAssetId = allAssets.find(({ ticker }) => ticker === toAssetType).id;
    performEstimatingTrade(
      fromAssetId,
      toAssetId,
      Number(fromAssetAmount),
      Number(toAssetAmount),
      'buy',
      null,
      this.props.showToastError
    );
  }

  render() {
    const {
      globalData,
      userDashboard,
      userDashboard: {
        allAssets
      }
    } = this.props;
    const {
      fromAssetAmount,
      toAssetAmount,
      fromAssetType,
      toAssetType
    } = this.state;
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <h2 className="p-4">Buy Assets</h2>
        <div className="row mt-3 h-100 bg_white">
          <div className="col-md-6">
            <div className="row mt-5 pl-4 pr-4">
              <div className="col-md-12">
                <label htmlFor="name" className="label_input">Buy</label>
                <div className="input-group buy_margin">
                  <input
                    type="number"
                    className="form-control field_inputs"
                    value={toAssetAmount}
                    onChange={this.onToAssetAmountChange}
                  />
                  <div className="input-group-btn">
                    <Dropdown
                      isOpen={this.state.toAssetDropdownOpen}
                      toggle={this.toAssetDropdownToggle}
                    >
                      <DropdownToggle caret className="btn_buy">
                        {toAssetType.toUpperCase()}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {
                          allAssets.map((thizAsset, i) => (
                            <DropdownItem
                              key={`to_asset_${i}`}
                              value={thizAsset.ticker}
                            >
                              {thizAsset.name} ({thizAsset.ticker.toUpperCase()})
                            </DropdownItem>
                          ))
                        }
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <label htmlFor="name" className="label_input">Using</label>
                <div className="input-group buy_margin">
                  <input
                    type="number"
                    className="form-control field_inputs"
                    value={fromAssetAmount}
                    aria-label="Text input with dropdown button"
                    onChange={this.onFromAssetAmountChange}
                  />
                  <div className="input-group-btn">
                    <Dropdown
                      isOpen={this.state.fromAssetDropdownOpen}
                      toggle={this.fromAssetDropdownToggle}
                    >
                      <DropdownToggle caret className="btn_buy">
                        {fromAssetType.toUpperCase()}
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem value="btc">Bitcoin (BTC)</DropdownItem>
                        <DropdownItem value="eth">Ethereum</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-12 mt-3 ml-auto">
                <button
                  type="button"
                  className="btn-create-register w-100"
                  onClick={this.estimateTrade}
                >Make Trade</button>
              </div>
            </div>
          </div>
          <Stats
            globalData={globalData}
            userDashboard={userDashboard}
            fromAssetType={fromAssetType}
            toAssetType={toAssetType}
          />
        </div>
      </div>
    );
  }
}
