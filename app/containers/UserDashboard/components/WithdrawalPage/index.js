import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import Stats from './Stats';

export default class BuyPage extends Component {
  static propTypes = {
    showToastSuccess: PropTypes.func.isRequired,
    showToastError: PropTypes.func.isRequired,
    globalData: PropTypes.object.isRequired,
    userDashboard: PropTypes.object.isRequired,
    performEstimatingTrade: PropTypes.func.isRequired,
    closeTradeSuccessModal: PropTypes.func.isRequired,
  }

  state = {
    fromAssetAmount: '',
    toAssetAmount: null,
    fromAssetType: this.props.userDashboard.fromAssetType,
    toAssetType: this.props.userDashboard.toAssetType,
    fromAssetDropdownOpen: false,
    toAssetDropdownOpen: false
  };

  componentWillUnmount() {
    this.props.closeTradeSuccessModal();
  }

  onFromAssetAmountChange = ({ target: { value: fromAssetAmount } }) => {
    this.setState({
      fromAssetAmount: fromAssetAmount
    });
  }
  onToAssetAmountChange = ({ target: { value: toAssetAmount } }) => {
    this.setState({
      toAssetAmount: (toAssetAmount < 0 || isNaN(toAssetAmount)) ? 0 : toAssetAmount
    });
  }

  toAssetDropdownToggle = evt => {
    const { value } = evt.target;
    const toAssetType = value || null;
    let fromAssetType;
    if (toAssetType && this.state.fromAssetType === toAssetType) {
      fromAssetType = toAssetType === 'btc' ? 'eth' : 'btc';
    }

    // const cb = this.updateLocalValues.bind(this, 'toAmount');

    this.setState(prevState => ({
      toAssetDropdownOpen: !prevState.toAssetDropdownOpen,
      ...(fromAssetType ? { fromAssetType } : {}),
      ...(toAssetType ? { toAssetType } : {})
    }), toAssetType ? null : null);
    if (toAssetType) {
      this.props.setFromAssetType(fromAssetType || this.state.fromAssetType);
      this.props.setToAssetType(toAssetType);
    }
  }

  estimateTrade = () => {
    const {
      fromAssetAmount,
      toAssetAmount
    } = this.state;
    const {
      fromAssetType,
      toAssetType
    } = this.props.userDashboard;
    const { confirmWithdrawal, userDashboard } = this.props;
    const { allAssets } = userDashboard;

    const fromAssetId = allAssets.find(({ ticker }) => ticker === fromAssetType).id;
    const toAssetId = allAssets.find(({ ticker }) => ticker === toAssetType).id;
    console.log('state', this.state);
    confirmWithdrawal({
      amount: this.state.toAssetAmount,
      coin: this.state.toAssetType,
      address: this.state.fromAssetAmount
    });
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
      toAssetAmount
    } = this.state;
    const {
      fromAssetType,
      toAssetType
    } = this.props.userDashboard;

    if(!globalData.currentUser.twoFactorWithdrawalEnabled){
      return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <h2 className="p-4">Withdraw</h2>
        <div className="row mt-3 h-100 bg_white">
          <div className="col-md-12">
            <div className="row mt-5 pl-4 pr-4">
              <div className="col-md-12 mt-3 withdraw-heading">
                In order to withdraw, you must first set up GoogleAuth
              </div>
              <div className="col-md-6 offset-md-3 withdraw-subheading">
                Currently, you may only withdraw Bitcoin and Ethereum. All withdrawals will be pending admin approval.
              </div>
              <div className="col-md-6 offset-md-3 pt-20">
                <Link to="/dashboard/settings/my_information">
                  <button
                    type="button"
                    className="btn-create-register w-50">
                  Go to set this up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <h2 className="p-4">Withdraw</h2>
        <div className="row mt-3 h-100 bg_white">
          <div className="col-md-6">
            <div className="row mt-5 pl-4 pr-4">
              <div className="col-md-12">
                <label htmlFor="name" className="label_input">Withdraw</label>
                <div className="input-group buy_margin">
                  <input
                    type="number"
                    className="form-control field_inputs"
                    value={toAssetAmount}
                    onChange={this.onToAssetAmountChange}
                    placeholder={0}
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
                        <DropdownItem
                          key={`btc`}
                          value={'btc'}
                        >
                          Bitcoin (BTC)
                        </DropdownItem>
                        <DropdownItem
                          key={`eth`}
                          value={'eth'}
                        >
                          Ethereum (ETH)
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <label htmlFor="name" className="label_input">To</label>
                <div className="input-group buy_margin">
                  <input
                    type="text"
                    className="form-control field_inputs"
                    value={fromAssetAmount}
                    aria-label={"Text input with dropdown button"}
                    onChange={this.onFromAssetAmountChange}
                    placeholder={"Address..."}
                  />
                  <div className="input-group-btn">
                    
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-12 mt-3 ml-auto">
                <button
                  type="button"
                  className="btn-create-register w-100"
                  onClick={this.estimateTrade}
                >Withdraw</button>
              </div>
            </div>
          </div>
          <Stats
            globalData={globalData}
            userDashboard={userDashboard}
            fromAssetType={'btc'}
            toAssetType={'eth'}
          />
        </div>
      </div>
    );
  }
}
