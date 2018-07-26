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
import TransferView from './components/TransferView';
import TradeView from './components/TradeView';

import { firstLetterCaps } from 'utils';

class Activity extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    adminDashboard: PropTypes.object.isRequired,
    activityType: PropTypes.string.isRequired,
    onChangeActivityType: PropTypes.func.isRequired,
    handleDatesChange: PropTypes.func.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    clearDates: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onChangeStatus: PropTypes.func.isRequired,
    state: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    globalData: PropTypes.object.isRequired,
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

  render() {
    const {
      activityType: selectedActivityType,
      onChangeActivityType,
      handleChangePage,
      adminDashboard: {
        totalActivitiesCount,
        isFetchingActivities
      },
      searchTerm,
      onSearch,
      onChangeStatus,
      globalData
    } = this.props;

    const isNoDataPresent = isFetchingActivities === false && totalActivitiesCount === 0;

    return (
      <div className="col-12 col-lg-9 col-md-12 h-100 content_section overflow-content">
        <h2 className="p-4">Activity</h2>
        <div className="row mt-3  bg_white purchase_content">
          <div className="col-lg-12">
            <div className="row mt-4 p-4">
              <div className="col-lg-3 col-md-3 col-12">
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
              <div className="col-lg-9 col-md-9 col-12">
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-12 col_act_6">
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
                  <div className="col-lg-2 col-md-2 col-12 col_act_6_2">
                    <select
                      type="text"
                      className="field_input_activity"
                      value={this.props.state}
                      onChange={onChangeStatus}
                    >
                      <option value={'all'}>Status: All</option>
                      <option value={'pending'}>Status: Pending</option>
                      <option value={'initiated'}>Status: In Process</option>
                      <option value={'complete'}>Status: Completed</option>
                      <option value={'canceled'}>Status: Cancelled</option>
                    </select>
                  </div>
                  <div className="col-lg-8 col-md-8 col-12 col_act_6_3">
                    <div className="input-group">
                      <span>
                        <DateRangePicker
                          startDateId="fromDateforAdmin"
                          startDate={this.props.startDate}
                          endDateId="toDateforAdmin"
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
                          orientation={globalData.windowInnerWidth < 576 ? 'vertical' : 'horizontal'}
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
          {
            isNoDataPresent ?
              <h3>No Data Present</h3> :
              <div className="col-lg-12 h-100">
                {['purchase', 'sale'].includes(selectedActivityType) ?
                  <TradeView {...this.props} /> :
                  <TransferView {...this.props} />
                }
                <Pagination
                  totalCount={totalActivitiesCount}
                  perPage={10}
                  activePage={this.props.page}
                  changePage={handleChangePage}
                />
              </div>
          }
        </div>
      </div>
    );
  }
}

export default SortHOC(Activity, 'fetchActivities');
