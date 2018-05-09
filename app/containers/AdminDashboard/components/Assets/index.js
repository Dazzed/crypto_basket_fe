import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Dropdown,
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

const upGlyph = (
  <FontAwesome
    name='caret-up'
  />);

const downGlyph = (
  <FontAwesome
    name='caret-down'
  />);

export default class Assets extends Component {
  componentWillMount() {
    this.props.fetchAssets();
  }
  // openUser = user => {
  //   this.props.startEditingUser(user);
  //   this.props.fetchUser(user.id);
  //   this.props.history.push(`/dashboard/user/${user.id}`);
  // }
  render() {
    const assets = this.props.adminDashboard.assets;
    console.log('assets', this.props.adminDashboard);
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
                      
                      { _.map(assets, elem=>{
                        {/*const changeUser = () => {
                          this.openUser(elem);
                        }*/}
                        return (
                          <tr>
                              <td>
                                {elem.name}
                              </td>
                              <td>1.0 BTC/ETH</td>
                              <td>{elem.quantity-elem.availableQuantityWithCommunity}</td>
                              <td>{elem.quantity}</td>
                              <td>{elem.availableQuantityWithCommunity}</td>
                              <td>{elem.totalValueInUSD}</td>
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