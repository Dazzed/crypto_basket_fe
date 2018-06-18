import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

import ArrowDown from 'img/arrow-down.png';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import WrapLoading from 'components/WrapLoading';
import Pagination from 'components/Pagination';

import SortHOC from './SortHOC';

const firstLetterCaps = str => `${str[0].toUpperCase()}${str.slice(1, str.length)}`;

class Activity extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    adminDashboard: PropTypes.object.isRequired,
    activityType: PropTypes.string.isRequired,
    onChangeActivityType: PropTypes.func.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const {
      adminDashboard: {
        assets: allAssets
      }
    } = this.props;
    const btcAssetObject = allAssets.find(a => a.ticker === 'btc');
    const ethAssetObject = allAssets.find(a => a.ticker === 'eth');
    this.state = {
      btcAssetObject,
      ethAssetObject
    };
  }

  componentWillReceiveProps() {
    if (!this.state.btcAssetObject || !this.state.ethAssetObject) {
      const {
        adminDashboard: {
          assets: allAssets
        }
      } = this.props;
      const btcAssetObject = allAssets.find(a => a.ticker === 'btc');
      const ethAssetObject = allAssets.find(a => a.ticker === 'eth');
      this.setState({
        btcAssetObject,
        ethAssetObject
      });
    }
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
                      <tr key={`desktop_activity_${index}`}>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {firstLetterCaps(activity.txType)}
                          </div>
                        </td>
                        <td>
                          <div className="w-75 text-left table_data_activity ml-2">
                            {
                              activity.txType === 'deposit' ?
                                <p>{activity.coin}</p> :
                                <Fragment>
                                  <span className="d-md-none d-lg-block">
                                    Bitcoin
                                    <br />
                                    <img src={ArrowDown} className="activity-down-img" />
                                    <br />
                                  </span>
                                  <span className="activity_text_one">Litecoin</span>
                                </Fragment>
                            }
                          </div>
                        </td>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {activity.email || activity.user.email}
                          </div>
                        </td>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {activity.confirmed ? 'Completed' : 'Pending'}
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
                        {/* <td className="vertical_middle">
                          <span className="deny_btn p-2">Deny</span>
                          <span className="accept_btn ml-2 p-2">Accept</span>
                        </td> */}
                        <td>
                          <div>
                            <div className="activity_text_two mb-3">
                              + {Number(activity.value)} {activity.coin}
                            </div>
                            ${Number.prototype.toFixed.call(Number(activity.usdValue), 2)} USD
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
                            {firstLetterCaps(activity.txType)}
                          </div>
                        </td>
                        <td className="vertical_middle">
                          <span className="activity_text_one">{activity.coin}</span>
                        </td>
                        <td className="vertical_middle">
                          <div className="activity_text_two">
                            {activity.email || activity.user.email}
                          </div>
                        </td>
                        <td className="vertical_top">
                          <div className="activity_text_two text-right">
                            {activity.confirmed ? 'Completed' : 'Pending'}
                          </div>
                          <div className="mt-3 text-right">{activity.confirmedTime ? moment(activity.confirmedTime).format('YYYY-MM-DD hh:mm:ss') : moment(activity.createdAt).format('YYYY-MM-DD hh:mm:ss')}</div>
                        </td>
                        <td className="vertical_top courier_type text-right">
                          <div>
                            <div className="activity_text_two mb-3 text-right">+ {Number(activity.value)} {activity.coin.toUpperCase()}</div>
                            ${Number.prototype.toFixed.call(Number(activity.usdValue), 2)} USD
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
                            {activity.email || activity.user.email}
                          </div>
                          <div className="mt-1">
                            <small className="small_activity_space">
                              {activity.confirmedTime ? moment(activity.confirmedTime).format('YYYY-MM-DD hh:mm:ss') : moment(activity.createdAt).format('YYYY-MM-DD hh:mm:ss')}&nbsp;
                              {firstLetterCaps(activity.txType)}
                            </small>
                          </div>
                        </td>
                        <td className="vertical_top">
                          <div className="activity_text_two courier_type">+ {Number(activity.value)} {activity.coin.toUpperCase()}</div>
                          <div className="mt-1">
                            <span className="small_activity_space">{activity.coin.toUpperCase()} {activity.confirmed ? 'Completed' : 'Pending'}</span>
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
    const {
      activityType: selectedActivityType,
      onChangeActivityType,
      handleChangePage,
      adminDashboard: {
        totalActivitiesCount
      },
      searchTerm,
      onSearch
    } = this.props;

    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section overflow-content">
        <h2 className="p-4">Activity</h2>
        <div className="row mt-3  bg_white purchase_content">
          <div className="col-lg-12">
            <div className="row mt-4 p-4">
              <div className="col-lg-3 col-md-3 col-3">
                <input
                  type="text"
                  name="filter_text"
                  id="filter_text"
                  className="field_input_activity col-lg-8"
                  placeholder="Filter by user..."
                  value={searchTerm}
                  onChange={onSearch}
                />
              </div>
              <div className="col-lg-9 col-md-9 col-9">
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-2 col_act_6">
                    <select
                      type="text"
                      className="field_input_activity"
                      value={selectedActivityType}
                      onChange={onChangeActivityType}
                    >
                      <option value="purchase">Type: Purchase</option>
                      <option value="sale">Type: Sale</option>
                      <option value="deposit">Type: Deposit</option>
                      <option value="withdraw">Type: Withdraw</option>
                      <option value="refund">Type: Refund</option>
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-2 col-2 col_act_6_2">
                    <select type="text" className="field_input_activity">
                      <option value={0}>Status: All</option>
                    </select>
                  </div>
                  <div className="col-lg-8 col-md-8 col-8 col_act_6_3">
                    <div className="input-group">
                      <DateRangePicker
                        startDateId="fromDateforAdmin"
                        startDate={this.state.startDate}
                        endDateId="toDateforAdmin"
                        endDate={this.state.endDate}
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                        showDefaultInputIcon
                        inputIconPosition="after"
                        hideKeyboardShortcutsPanel
                        displayFormat="YYYY-MM-DD"
                        daySize={35}
                        isOutsideRange={() => false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 h-100">
            {this.renderDesktop()}
            {this.renderTab()}
            {this.renderMobile()}
            <Pagination
              totalCount={totalActivitiesCount}
              perPage={10}
              activePage={this.props.page}
              changePage={handleChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SortHOC(Activity, 'fetchActivities');
