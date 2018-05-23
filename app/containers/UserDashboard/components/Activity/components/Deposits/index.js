import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Pagination from 'components/Pagination';
import WrapLoading from 'components/WrapLoading';

import BtcIcon from 'img/icon_btc.png';
import ETHIcon from 'img/icon_eth.png';

export default class Withdrawals extends Component {
  state = {
    page: 1,
    activityType: 'deposit',
    limit: 10
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.props.fetchActivities({
      limit: this.state.limit,
      offset: this.state.limit * (this.state.page - 1),
      where: {
        txType: 'deposit'
      },
    }, `/api/users/${this.props.globalData.currentUser.id}/transfers`);
  }

  handleChangePage = (page) => {
    this.setState({ page }, this.fetch);
  };

  render() {
    const {
      totalActivitiesCount,
      activities,
      isFetchingActivities
    } = this.props.userDashboard;

    return (
      <div className="row mt-3  bg_white purchase_content">
        <div className="col-lg-12">
          <div className="row mt-4 p-4">
            <div className="col-lg-6 col-md-8 col-12 ml-auto">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-6">
                  <select type="text" className="field_input_activity">
                    <option value={0}>Show in USD</option>
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-6">
                  <div className="input-group">
                    <span className="icon_datepicker">
                      <i className="fa fa-calendar" aria-hidden="true" />
                    </span>
                    <input type="text" defaultValue="" className="form-control text_icon" placeholder="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 h-100">
          <div className="row mt-2 p-4">
            <div className="col-lg-12 col-md-12">
              {/* visible medium and large devices */}
              <div className="users_list table-responsive d-none d-sm-none d-md-block">
                <table className="table border_top">
                  <WrapLoading loading={isFetchingActivities} loadingProps={{ insideTable: true, colSpan: 4 }}>
                    <tbody>
                      {
                        activities.map((activity, i) => (
                          <tr key={`activity_desktop_${i}`}>
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
                                {activity.confirmed ? 'Completed' : 'Pending'}
                              </div>
                            </td>
                            <td className="vertical_top courier_type">
                              ${activity.usdValue} USD
                              <div className="activity_text_two mt-3">
                                + {activity.value} {activity.coin}
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </WrapLoading>
                </table>
              </div>
              <div className="users_list table-responsive d-block d-md-none d-lg-none">
                <table className="table border_top">
                  <WrapLoading loading={isFetchingActivities} loadingProps={{ insideTable: true, colSpan: 2 }}>
                    <tbody>
                      {
                        activities.map((activity, i) => (
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
                                  {activity.confirmed ? 'Completed' : 'Pending'}
                                </span>
                                <br />
                                <br />
                                <span className="activity_text_one">{activity.coin}</span>
                              </div>
                            </td>
                            <td className="vertical_top courier_type">
                              ${activity.usdValue} USD
                              <div className="activity_text_two mt-3">
                                + {activity.value} {activity.coin}
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
            totalCount={totalActivitiesCount}
            perPage={10}
            activePage={this.state.page}
            changePage={this.handleChangePage}
          />
        </div>
      </div>
    );
  }
}

Withdrawals.propTypes = {
  globalData: PropTypes.object.isRequired,
  userDashboard: PropTypes.object.isRequired,
  fetchActivities: PropTypes.func.isRequired,
};
