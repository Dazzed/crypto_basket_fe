import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col
} from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom'

import _ from 'lodash';

import { formatNumberWithCommas } from 'utils';
const upGlyph = (
  <FontAwesome
    name='caret-up'
  />);

const downGlyph = (
  <FontAwesome
    name='caret-down'
  />);
function round(number, precision) {
  var shift = function (number, precision) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}
export default class Assets extends Component {
  componentWillMount() {
    this.props.fetchAssets();
  }

  openAsset = asset => {
    this.props.startEditingAsset(asset);
    this.props.history.push(`/dashboard/asset/${asset.id}`);
  }

  render() {
    const assets = this.props.adminDashboard.assets;
    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section">
        <div className="row">
          <div className="col-md-8 col-4">
            <h2 className="p-4">Assets</h2>
          </div>
        </div>
        <div className="row mt-3  bg_white">
          <div className="col-lg-12 h-100">
            <div className="row mt-4 p-4">
              <div className="col-lg-12 col-md-12">
                {/* visible medium and large devices */}

                <div className="users_list table-responsive d-none d-sm-none d-md-block">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Current Exchange Rate</th>
                        <th>Held by Community</th>
                        <th>Held by Melotic</th>
                        <th>Available for Purchase</th>
                        <th>Value in USD</th>
                      </tr>
                    </thead>
                    <tbody>

                      {_.map(assets, elem => {
                        const changeAsset = () => {
                          this.openAsset(elem);
                        }
                        return (
                          <tr onClick={changeAsset}>
                            <td>
                              {elem.name}
                            </td>
                            <td>{elem.ticker === 'btc' ? round(elem.totalValueInUSD / elem.quantity, 2) : round(elem.quantity / elem.totalValueInBTC, 2)} {elem.ticker.toUpperCase()}/{elem.ticker === 'btc' ? 'USD' : 'BTC'}</td>
                            <td>{elem.quantity - elem.availableQuantityWithCommunity}</td>
                            <td>{formatNumberWithCommas(elem.quantity)}</td>
                            <td>{formatNumberWithCommas(elem.availableQuantityWithCommunity)}</td>
                            <td>{formatNumberWithCommas(elem.totalValueInUSD)}</td>
                          </tr>
                        );
                      })}
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

Assets.propTypes = {
  globalData: PropTypes.object.isRequired,
  adminDashboard: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  startEnablingTFAAdmin: PropTypes.func.isRequired,
  openOtpModal: PropTypes.func.isRequired,
  showToastSuccess: PropTypes.func.isRequired,
  showToastError: PropTypes.func.isRequired,
  startCreatingAdmin: PropTypes.func.isRequired
};
