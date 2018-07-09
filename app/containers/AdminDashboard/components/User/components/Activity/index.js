import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Pagination from 'components/Pagination';
import WrapLoading from 'components/WrapLoading';
import renderImageForAsset from 'helpers/renderImageForAsset';
import BtcIcon from 'img/icon_btc.png';
import ETHIcon from 'img/icon_eth.png';
import ArrowDownImage from 'img/arrow-down.png';

import SortHOC from '../../../Activity/SortHOC';

import { firstLetterCaps } from 'utils';

class Activity extends Component {
  static propTypes = {
    adminDashboard: PropTypes.object.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    activityType: PropTypes.string.isRequired,
    onChangeActivityType: PropTypes.func.isRequired,
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

  renderActivityTypes = () => {
    return (
      <div className="col-lg-12">
        <div className="row mt-4 p-4">
          <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 col_act_6 ml-auto">
            <select
              type="text"
              className="field_input_activity"
              value={this.props.activityType}
              onChange={this.props.onChangeActivityType}
            >
              <option value="purchase">Type: Purchase</option>
              <option value="sale">Type: Sale</option>
              <option value="deposit">Type: Deposit</option>
              <option value="withdraw">Type: Withdraw</option>
              <option value="refund">Type: Refund</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  renderTradeModel = () => {
    const {
      isFetchingUserActivities,
      userActivities,
      userActivitiesCount
    } = this.props.adminDashboard;

    const {
      hoveredId
    } = this.state;
    return (
      <div className="row mt-3  bg_white purchase_content">
        {this.renderActivityTypes()}
        <div className="col-lg-12 h-100">
          <div className="row mt-2 p-4">
            <div className="col-lg-12 col-md-12">
              {/* visible medium and large devices */}
              <div className="users_list table-responsive d-none d-sm-none d-md-block">
                <table className="table border_top">
                  <WrapLoading loading={isFetchingUserActivities} loadingProps={{ insideTable: true, colSpan: 4 }}>
                    <tbody>
                      {
                        userActivities.map((data, i) => (
                          <tr
                            key={`trade_data_desktop_${i}`}
                            onMouseEnter={this.onHoverRecord.bind(this, data)}
                            onMouseLeave={this.onHoverOffRecord}
                          >
                            <td>
                              <div className="h-100 text-right table_data_activity">
                                {/* <img src="assets/img/activity_img1.PNG" className="activity_img" /> */}
                                {renderImageForAsset(data.toAsset.ticker)}
                              </div>
                              <div className="w-75 text-left table_data_activity ml-2">
                                <span className="d-md-none d-lg-block">
                                  {data.fromAsset.name}
                                  <br />
                                  <img src={ArrowDownImage} className="activity-down-img" />
                                  <br />
                                </span>
                                <span className="activity_text_one">
                                  {data.isBuy ? data.toAsset.name : data.fromAsset.name}
                                  &nbsp;{firstLetterCaps(data.isBuy ? 'purchase' : 'sale')}
                                </span>
                              </div>
                            </td>
                            <td className="vertical_top">
                              Initiated
                              <div className="activity_text_two mt-3">
                                {moment(data.createdAt).format('MMM DD, YYYY')}
                              </div>
                            </td>
                            <td className="vertical_middle">
                              <div className="activity_text_two">
                                {firstLetterCaps(data.state)}
                              </div>
                            </td>
                            {
                              hoveredId === data.id ?
                                <td className="vertical_middle">
                                  <span className="deny_btn p-2">Deny</span>
                                  <span className="accept_btn ml-2 p-2">Accept</span>
                                </td> :
                                <td className="vertical_top courier_type">
                                  $12,345.12 USD
                                  <div className="activity_text_two mt-3">
                                    {data.isBuy ?
                                      `+ ${data.toAssetAmount} ${data.toAsset.ticker.toUpperCase()}` :
                                      `- ${Number(data.fromAssetAmount)} ${data.fromAsset.ticker.toUpperCase()}`
                                    }
                                  </div>
                                </td>
                            }
                          </tr>
                        ))
                      }
                    </tbody>
                  </WrapLoading>
                </table>
              </div>
              <div className="users_list table-responsive d-block d-md-none d-lg-none">
                <table className="table border_top">
                  <WrapLoading loading={isFetchingUserActivities} loadingProps={{ insideTable: true, colSpan: 2 }}>
                    <tbody>
                      {
                        userActivities.map((data, i) => (
                          <tr key={`trade_data_mobile_${i}`}>
                            <td>
                              <div className="h-100 text-right table_data_activity">
                                {renderImageForAsset(data.toAsset.ticker)}
                              </div>
                              <div className="w-75 text-left table_data_activity ml-2">
                                <span>
                                  {moment(data.createdAt).format('MMM DD, YYYY')}
                                </span>
                                <span>
                                  {firstLetterCaps(data.state)}
                                </span>
                                <br />
                                <br />
                                <span className="activity_text_one">
                                  {data.isBuy ? data.toAsset.name : data.fromAsset.name}
                                  &nbsp;{firstLetterCaps(data.isBuy ? 'purchase' : 'sale')}
                                </span>
                              </div>
                            </td>
                            <td className="vertical_top courier_type">
                              $12,345.12 USD
                              <div className="activity_text_two mt-3">
                                {data.isBuy ?
                                  `+ ${data.toAssetAmount} ${data.toAsset.ticker.toUpperCase()}` :
                                  `- ${Number(data.fromAssetAmount)} ${data.fromAsset.ticker.toUpperCase()}`
                                }
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
        </div>
        <div className="col-lg-12">
          <Pagination
            className="text-center"
            totalCount={userActivitiesCount}
            perPage={10}
            activePage={this.props.page}
            changePage={this.props.handleChangePage}
          />
        </div>
      </div>
    );
  }

  renderTransferModel = () => {
    const {
      isFetchingUserActivities,
      userActivities,
      userActivitiesCount
    } = this.props.adminDashboard;
    const {
      hoveredId
    } = this.state;
    return (
      <div className="row mt-3  bg_white purchase_content">
        {this.renderActivityTypes()}
        <div className="col-lg-12 h-100">
          <div className="row mt-2 p-4">
            <div className="col-lg-12 col-md-12">
              {/* visible medium and large devices */}
              <div className="users_list table-responsive d-none d-sm-none d-md-block">
                <table className="table border_top">
                  <WrapLoading loading={isFetchingUserActivities} loadingProps={{ insideTable: true, colSpan: 4 }}>
                    <tbody>
                      {
                        userActivities.map((activity, i) => (
                          <tr
                            key={`activity_desktop_${i}`}
                            onMouseEnter={this.onHoverRecord.bind(this, activity)}
                            onMouseLeave={this.onHoverOffRecord}
                          >
                            <td>
                              <div className="h-100 text-right table_data_activity">
                                <img src={activity.coin.toLowerCase() === 'eth' ? ETHIcon : BtcIcon} className="activity_img" />
                              </div>
                              <div className="w-75 text-left table_data_activity ml-2">
                                <span className="activity_text_one">{activity.coin}</span>
                              </div>
                            </td>
                            <td className="vertical_top">
                              Initiated
                              <div className="activity_text_two mt-3">
                                {moment(activity.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                              </div>
                            </td>
                            <td className="vertical_middle">
                              <div className="activity_text_two">
                                {/* {activity.confirmed ? 'Completed' : 'Pending'} */}
                                {firstLetterCaps(activity.state)}
                              </div>
                            </td>
                            {
                              hoveredId === activity.id ?
                                <td className="vertical_middle">
                                  <span className="deny_btn p-2">Deny</span>
                                  <span className="accept_btn ml-2 p-2">Accept</span>
                                </td> :
                                <td className="vertical_top courier_type">
                                  ${Number.prototype.toFixed.call(Number(activity.usdValue), 2)} USD
                                  <div className="activity_text_two mt-3">
                                    + {Number(activity.value)} {activity.coin}
                                  </div>
                                </td>
                            }
                          </tr>
                        ))
                      }
                    </tbody>
                  </WrapLoading>
                </table>
              </div>
              <div className="users_list table-responsive d-block d-md-none d-lg-none">
                <table className="table border_top">
                  <WrapLoading loading={isFetchingUserActivities} loadingProps={{ insideTable: true, colSpan: 2 }}>
                    <tbody>
                      {
                        userActivities.map((activity, i) => (
                          <tr key={`mobile_activity_${i}`}>
                            <td>
                              <div className="h-100 text-right table_data_activity">
                                <img src={activity.coin.toLowerCase() === 'eth' ? ETHIcon : BtcIcon} className="activity_img" />
                              </div>
                              <div className="w-75 text-left table_data_activity ml-2">
                                <span>
                                  {moment(activity.createdAt).format('MMM dd, YYYY')}
                                </span>
                                <span>
                                  {/* {activity.confirmed ? 'Completed' : 'Pending'} */}
                                  {firstLetterCaps(activity.state)}
                                </span>
                                <br />
                                <br />
                                <span className="activity_text_one">{activity.coin}</span>
                              </div>
                            </td>
                            <td className="vertical_top courier_type">
                              ${Number.prototype.toFixed.call(Number(activity.usdValue), 2)} USD
                              <div className="activity_text_two mt-3">
                                + {Number(activity.value)} {activity.coin}
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
        </div>
        <div className="col-lg-12">
          <Pagination
            className="text-center"
            totalCount={userActivitiesCount}
            perPage={10}
            activePage={this.props.page}
            changePage={this.props.handleChangePage}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.props.isChangingActivityType) {
      return null;
    }
    const {
      isFetchingUserActivities,
      userActivitiesCount
    } = this.props.adminDashboard;
    if (isFetchingUserActivities === false && userActivitiesCount === 0) {
      return (
        <div className="row mt-3  bg_white purchase_content">
          {this.renderActivityTypes()}
          <div className="col-lg-12 h-100">
            <h3>No Data Present</h3>
          </div>
        </div>
      );
    }
    return (
      <Fragment>
        {['purchase', 'sale'].includes(this.props.activityType) ?
          this.renderTradeModel() :
          this.renderTransferModel()
        }
      </Fragment>
    );
  }
}

export default (
  SortHOC(
    Activity,
    'fetchUserActivities'
  )
);
