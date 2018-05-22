import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BTCIcon from 'img/icon_btc.png';
import ETHIcon from 'img/icon_eth.png';

export default class Deposit extends Component {
  static propTypes = {
    globalData: PropTypes.object.isRequired,
  };

  render() {
    const { wallets: myWallets } = this.props.globalData.currentUser;
    const myBTCWallet = myWallets.find(w => w.assetId === 'btc');
    const myETHWallet = myWallets.find(w => w.assetId === 'eth');
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <h2 className="p-4">Deposit</h2>
        <div className="row mt-3 h-100 bg_white">
          <div className="col-lg-12 h-100">
            <div className="row mt-2 p-4">
              <div className="col-lg-12 col-md-12">
                <div className="deposit-info-container mb-4">
                  <small className="melotic-grey"><strong>Currently, you may only deposit Bitcoin and Etherium</strong></small>
                </div>
                <div className="table-responsive">
                  <table className="table border_top deposit-table">
                    <tbody>
                      <tr>
                        <th>
                          <div className="h-100 text-right table_data_activity">
                            <img src={BTCIcon} className="activity_img" />
                          </div>
                          <div className="w-100 text-left ml-5 pt-2">
                            Bitcoin
                          </div>
                        </th>
                        <th className="vertical_top courier_type">
                          <div className="mt-3 float-right">{myBTCWallet.balance} BTC</div>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <div className="h-100 text-right table_data_activity">
                            <img src={ETHIcon} className="activity_img" />
                          </div>
                          <div className="w-100 text-left ml-5 pt-2">
                            Etherium
                          </div>
                        </th>
                        <th className="vertical_top courier_type">
                          <div className="mt-3 float-right">{myETHWallet.balance} ETH</div>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
