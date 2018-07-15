import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Pagination from 'components/Pagination';
import WrapLoading from 'components/WrapLoading';

import renderImageForAsset from 'helpers/renderImageForAsset';


import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import SortHOC from '../TransferSortHOC';

import { firstLetterCaps } from 'utils';

class Refunds extends Component {
  state = {
    hoveredId: null,
    valueIn: 'usd'
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
  onChange = evt => {
    this.setState({valueIn: evt.target.value});
  }

  render() {
    const {
      totalActivitiesCount,
      activities,
      isFetchingActivities
    } = this.props.userDashboard;

    const {
      hoveredId
    } = this.state;

    const isNoDataPresent = isFetchingActivities === false && totalActivitiesCount === 0;

    return (
      <div className="row mt-3  bg_white purchase_content">
        <div className="col-lg-12">
          <div className="row mt-4 p-4">
            <div className="col-lg-9 col-md-9 col-12 ml-auto">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-3">
                  <select type="text" className="field_input_activity" onChange={this.onChange}>
                    <option value={'usd'}>Show in USD</option>
                    <option value={'btc'}>Show in BTC</option>
                    <option value={'eth'}>Show in ETH</option>
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-6">
                  <div className="input-group">
                    <span>
                      <DateRangePicker
                        startDateId="fromDateforUser"
                        startDate={this.props.startDate}
                        endDateId="toDateforUser"
                        endDate={this.props.endDate}
                        onDatesChange={({ startDate, endDate }) => this.props.handleDatesChange(startDate, endDate)}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                        showDefaultInputIcon
                        inputIconPosition="after"
                        hideKeyboardShortcutsPanel
                        displayFormat="YYYY-MM-DD"
                        daySize={35}
                        isOutsideRange={() => false}
                      />
                    </span>
                    <span className="clear-date-container">
                      <a className="red cursor-pointer" onClick={this.props.clearDates}>Clear</a>
                    </span>
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
                {
                  isNoDataPresent && <h3>No Data Present</h3>
                }
                <table className="table border_top">
                  <WrapLoading loading={isFetchingActivities} loadingProps={{ insideTable: true, colSpan: 4 }}>
                    <tbody>
                      {
                        activities.map((activity, i) => (
                          <tr
                            key={`activity_desktop_${i}`}
                            onMouseEnter={this.onHoverRecord.bind(this, activity)}
                            onMouseLeave={this.onHoverOffRecord}
                          >
                            <td>
                              <div className="h-100 text-right table_data_activity">
                                {renderImageForAsset(activity.coin.toLowerCase())}
                              </div>
                              <div className="w-75 text-left table_data_activity ml-2">
                                <span className="activity_text_one">{activity.coin}</span>
                              </div>
                            </td>
                            <td className="vertical_top">
                              Initiated
                              <div className="activity_text_two mt-3">
                                {moment(activity.createdAt).format('MMM DD, YYYY')}
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
                                  <span className="deny_btn p-2">Cancel</span>
                                </td> :
                                <td className="vertical_top courier_type">
                                  ${activity[this.state.valueIn + 'Value']} {this.state.valueIn.toUpperCase()}
                                  <div className="activity_text_two mt-3">
                                    + {activity.value} {activity.coin}
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
                {
                  isNoDataPresent && <h3>No Data Present</h3>
                }
                <table className="table border_top">
                  <WrapLoading loading={isFetchingActivities} loadingProps={{ insideTable: true, colSpan: 2 }}>
                    <tbody>
                      {
                        activities.map((activity, i) => (
                          <tr key={`mobile_activity_${i}`}>
                            <td>
                              <div className="h-100 text-right table_data_activity">
                                {renderImageForAsset(activity.coin.toLowerCase())}
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
                              ${activity[this.state.valueIn + 'Value']} {this.state.valueIn.toUpperCase()}
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
            activePage={this.props.activePage}
            changePage={this.props.handleChangePage}
          />
        </div>
      </div>
    );
  }
}

Refunds.propTypes = {
  userDashboard: PropTypes.object.isRequired,
  handleDatesChange: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
};

export default SortHOC(Refunds, 'refund');
