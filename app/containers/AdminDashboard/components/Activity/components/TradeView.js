import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ArrowDown from 'img/arrow-down.png';
import WrapLoading from 'components/WrapLoading';

import { firstLetterCaps } from 'utils';

export default class TransferView extends Component {
  static propTypes = {
    adminDashboard: PropTypes.object.isRequired,
    isChangingActivityType: PropTypes.bool.isRequired,
  }

  state = {
    hoveredId: null
  };

  onHoverRecord = record => {
    if (this.state.hoveredId === record.id) {
      return;
    }
    if (record.state === 'initiated') {
      this.setState({ hoveredId: record.id });
    }
  }

  onHoverOffRecord = () => {
    this.setState({
      hoveredId: null
    });
  }

  renderDesktop = () => {
    const {
      activities,
      isFetchingActivities
    } = this.props.adminDashboard;
    return (
      <div className="row mt-2 p-4  d-none d-sm-none d-md-none d-lg-block">
        <div className="col-lg-12 col-md-12">
          <div className="users_list table-responsive pr-5">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    Type
                  </th>
                  <th>
                    Asset
                  </th>
                  <th>
                    Email Address
                  </th>
                  <th>
                    Transaction Status
                  </th>
                  <th>
                    Initiated
                  </th>
                  <th>
                    Completed
                  </th>
                  <th>
                    Value in USD<i className="fa fa-caret-down ml-2" />
                  </th>
                </tr>
              </thead>
              <WrapLoading loading={isFetchingActivities} loadingProps={{ insideTable: true, colSpan: 7 }}>
                <tbody>
                  {
                    activities.map((activity, index) => (
                      <tr
                        key={`desktop_activity_${index}`}
                        onMouseEnter={this.onHoverRecord.bind(this, activity)}
                        onMouseLeave={this.onHoverOffRecord}
                      >
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {firstLetterCaps(activity.isBuy ? 'purchase' : 'sale')}
                          </div>
                        </td>
                        <td>
                          <div className="w-75 text-left table_data_activity ml-2">
                            <p>{activity.isBuy ? activity.toAsset.name : activity.fromAsset.name}</p>
                          </div>
                        </td>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {activity.user.email}
                          </div>
                        </td>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {/* {activity.confirmed ? 'Completed' : 'Pending'} */}
                            {firstLetterCaps(activity.state)}
                          </div>
                        </td>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {moment(activity.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                          </div>
                        </td>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {activity.confirmedTime ? moment(activity.confirmedTime).format('YYYY-MM-DD hh:mm:ss') : 'N/A'}
                          </div>
                        </td>
                        <td className="vertical_middle">
                          <span className="deny_btn p-2">Deny</span>
                          <span className="accept_btn ml-2 p-2">Accept</span>
                        </td>
                        <td>
                          <div>
                            <div className="activity_text_two mb-3">
                              {activity.isBuy ?
                                `+ ${activity.toAssetAmount} ${activity.toAsset.ticker.toUpperCase()}` :
                                `- ${Number(activity.fromAssetAmount)} ${activity.fromAsset.ticker.toUpperCase()}`
                              }
                            </div>
                            {/* ${Number.prototype.toFixed.call(Number(activity.usdValue), 2)} USD */}
                            $12,345.12 USD
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </WrapLoading>
            </table>
          </div>
        </div>
      </div>
    );
  }

  renderTab = () => {
    const {
      activities,
      isFetchingActivities
    } = this.props.adminDashboard;
    return (
      <div className="row mt-2  d-none d-sm-none d-md-block d-lg-none">
        <div className="col-lg-12 col-md-12">
          <div className="users_list table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    Type
                  </th>
                  <th>
                    Asset
                  </th>
                  <th>
                    Email Address
                  </th>
                  <th className="text-right">
                    Transaction Status
                  </th>
                  <th className="text-right">
                    Value in USD<i className="fa fa-caret-down ml-2" />
                  </th>
                </tr>
              </thead>
              <WrapLoading loading={isFetchingActivities} loadingProps={{ insideTable: true, colSpan: 5 }}>
                <tbody>
                  {
                    activities.map((activity, index) => (
                      <tr key={`tablet_activity_${index}`}>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {firstLetterCaps(activity.isBuy ? 'purchase' : 'sale')}
                          </div>
                        </td>
                        <td className="vertical_middle">
                          <span className="activity_text_one">
                            {activity.isBuy ? activity.toAsset.name : activity.fromAsset.name}
                          </span>
                        </td>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {activity.user.email}
                          </div>
                        </td>
                        <td className="vertical_top">
                          <div className="activity_text_two text-right">
                            {/* {activity.confirmed ? 'Completed' : 'Pending'} */}
                            {firstLetterCaps(activity.state)}
                          </div>
                          <div className="mt-3 text-right">{activity.confirmedTime ? moment(activity.confirmedTime).format('YYYY-MM-DD hh:mm:ss') : moment(activity.createdAt).format('YYYY-MM-DD hh:mm:ss')}</div>
                        </td>
                        <td className="vertical_top courier_type text-right">
                          <div>
                            <div className="activity_text_two mb-3 text-right">
                              {activity.isBuy ?
                                `+ ${activity.toAssetAmount} ${activity.toAsset.ticker.toUpperCase()}` :
                                `- ${Number(activity.fromAssetAmount)} ${activity.fromAsset.ticker.toUpperCase()}`
                              }
                            </div>
                            {/* ${Number.prototype.toFixed.call(Number(activity.usdValue), 2)} USD */}
                            $12,345.12 USD
                      {/* <div className="mt-2">
                        <span className="deny_btn p-2">Deny</span>
                        <span className="accept_btn ml-2 p-2">Accept</span>
                      </div> */}
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </WrapLoading>
            </table>
          </div>
        </div>
      </div>
    );
  }

  renderMobile = () => {
    const {
      activities,
      isFetchingActivities
    } = this.props.adminDashboard;
    return (
      <div className="row mt-2  d-block d-md-none d-lg-none">
        <div className="col-lg-12 col-md-12">
          <div className="users_list table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th colSpan={2} className="text-left">
                    Transaction
                  </th>
                </tr>
              </thead>
              <WrapLoading loading={isFetchingActivities} loadingProps={{ insideTable: true, colSpan: 2 }}>
                <tbody>
                  {
                    activities.map((activity, index) => (
                      <tr key={`mobile_activity_${index}`}>
                        <td className="vertical_top">
                          <div className="activity_text_two">
                            {activity.user.email}
                          </div>
                          <div className="mt-1">
                            <small className="small_activity_space">
                              {activity.confirmedTime ? moment(activity.confirmedTime).format('YYYY-MM-DD hh:mm:ss') : moment(activity.createdAt).format('YYYY-MM-DD hh:mm:ss')}&nbsp;
                              {firstLetterCaps(activity.isBuy ? 'purchase' : 'sale')}
                            </small>
                          </div>
                        </td>
                        <td className="vertical_top">
                          <div className="activity_text_two courier_type">
                            {activity.isBuy ?
                              `+ ${activity.toAssetAmount} ${activity.toAsset.ticker.toUpperCase()}` :
                              `- ${Number(activity.fromAssetAmount)} ${activity.fromAsset.ticker.toUpperCase()}`
                            }
                          </div>
                          <div className="mt-1">
                            <span className="small_activity_space">
                              {activity.isBuy ? activity.toAsset.name : activity.fromAsset.name}
                              {/* {activity.confirmed ? 'Completed' : 'Pending'} */}
                              {firstLetterCaps(activity.state)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </WrapLoading>
            </table>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.isChangingActivityType) {
      return null;
    }
    return (
      <Fragment>
        {this.renderDesktop()}
        {this.renderTab()}
        {this.renderMobile()}
      </Fragment>
    );
  }
}