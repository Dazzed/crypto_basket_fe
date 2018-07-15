import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/Loading';

export default class Stats extends Component {
  static propTypes = {
    globalData: PropTypes.object.isRequired,
    userDashboard: PropTypes.object.isRequired,
    fromAssetType: PropTypes.string.isRequired,
    toAssetType: PropTypes.string.isRequired,
  }

  getFromAssetMinMaxValue = type => {
    const {
      userDashboard: {
        allAssets
      },
      fromAssetType,
      toAssetType
    } = this.props;
    const meloticFromAsset = allAssets.find(({ ticker }) => ticker === fromAssetType) || {};
    const meloticToAsset = allAssets.find(({ ticker }) => ticker === toAssetType) || {};
    let newFromAssetPrice = (() => {
      try {
        return Number(
          Number(type === 'minimum' ? meloticToAsset.minPurchaseAmount : meloticToAsset.maxPurchaseAmount) * (
            meloticToAsset.exchangeRates[meloticFromAsset.ticker] ?
              Number(meloticToAsset.exchangeRates[meloticFromAsset.ticker].bid) : 0
          )
        );
      } catch (e) {
        return 0;
      }
    })();
    if (meloticFromAsset.ticker === 'eth' && meloticToAsset.ticker === 'btc') {
      try {
        const numerator = 1 * Number(type === 'minimum' ? meloticToAsset.minPurchaseAmount : meloticToAsset.maxPurchaseAmount);
        const denominator = Number(meloticFromAsset.exchangeRates.btc.ask);
        newFromAssetPrice = numerator / denominator;
      } catch (e) {
        console.log(e);
        return 0;
      }
    }
    return newFromAssetPrice || 0;
  }

  render() {
    const {
      globalData: {
        currentUser: {
          wallets: myWallets
        }
      },
      userDashboard: {
        isFetchingAssets,
        errorFetchingAllAssets,
        allAssets
      },
      fromAssetType,
      toAssetType
    } = this.props;

    if (isFetchingAssets) {
      return (
        <div className="col-md-5">
          <div className="row mt-3 pl-3 border_buy">
            <div className="col-md-12  mr-auto mt-3">
              <Loading />
            </div>
          </div>
        </div>
      );
    } else if (errorFetchingAllAssets) {
      return (
        <div className="col-md-5">
          <div className="row mt-3 pl-3 border_buy">
            <div className="col-md-12  mr-auto mt-3">
              <strong className="red">
                There was an error fetching information. Please reload your browser.
              </strong>
            </div>
          </div>
        </div>
      );
    }
    const currentUser = this.props.globalData.currentUser;
    const myFromAssetWallet = myWallets.find(({ assetId }) => assetId === fromAssetType) || {};
    const myToAssetWallet = myWallets.find(({ assetId }) => assetId === toAssetType) || {};
    const meloticFromAsset = allAssets.find(({ ticker }) => ticker === fromAssetType) || {};
    const meloticToAsset = allAssets.find(({ ticker }) => ticker === toAssetType) || {};
    return (
      <div className="col-md-5">
        <div className="row mt-3 pl-3 border_buy">
          <div className="col-md-12  mr-auto mt-3">
            <div className="row pl-3 pr-3 pt-2 pb-2 mt-3">
              <div className="col-md-12">
                <label htmlFor="name" className="label_input">
                  You have available
                </label>
              </div>
              <div className="col-md-12 col-12">
                <div className="row mt-3">
                  <div className="col-md-6 col-6">
                    <span className="buy_assets_text">
                      {myToAssetWallet.balance} {toAssetType.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-md-6 col-6">
                    <span className="buy_assets_text">
                      ${myToAssetWallet.usdPrice ? myToAssetWallet.usdPrice.toFixed(2) : 0} USD
                    </span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6 col-6">
                    <span className="buy_assets_text">
                      {myFromAssetWallet.balance} {fromAssetType.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-md-6 col-6">
                    <span className="buy_assets_text">
                      ${myFromAssetWallet.usdPrice ? myFromAssetWallet.usdPrice.toFixed(2) : 0} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pl-3 pr-3 pt-2 pb-2" style={{ borderLeft: '1px solid #' }}>
              <div className="col-md-12 col-12">
                <div className="row mt-3">
                  <div className="col-md-6 col-6">
                    <label htmlFor="name" className="label_input"> Minimum Withdrawal
                    </label>
                  </div>
                  <div className="col-md-6 col-6">
                    <label htmlFor="name" className="label_input"> Maximum Withdrawal
                  </label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6 col-6">
                    <span className="buy_assets_text">
                      {currentUser.withdrawMinimumETH} ETH
                    </span>
                  </div>
                  <div className="col-md-6 col-6">
                    <span className="buy_assets_text">
                      {currentUser.withdrawMinimumBTC} BTC
                    </span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6 col-6">
                    <span className="buy_assets_text">
                      {currentUser.withdrawLimitETH} ETH
                    </span>
                  </div>
                  <div className="col-md-6 col-6">
                    <span className="buy_assets_text">
                      {currentUser.withdrawLimitBTC} BTC
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
