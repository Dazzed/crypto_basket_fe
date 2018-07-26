import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Pagination from 'components/Pagination';
import WrapLoading from 'components/WrapLoading';
import renderImageForAsset from 'helpers/renderImageForAsset';
import ArrowDownImage from 'img/arrow-down.png';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { firstLetterCaps, formatNumberWithCommas } from 'utils';

import TradeSortHOC from '../TradeSortHOC';

class Purchases extends Component {
  state = {
    hoveredId: null,
    valueIn: 'usd'
  }

  onHoverRecord = record => {
    if (this.state.hoveredId === record.id) {
      return;
    }
    if (record.state === 'pending') {
      this.setState({ hoveredId: record.id });
    }
  }

  onHoverOffRecord = () => {
    this.setState({
      hoveredId: null
    });
  }

  onChange = evt => {
    this.setState({ valueIn: evt.target.value });
  }
  render() {
    const {
      globalData
    } = this.props;
    const {
      totalTradeDataCount,
      tradeData,
      isFetchingTradeData
    } = this.props.userDashboard;

    const {
      hoveredId
    } = this.state;

    const isNoDataPresent = isFetchingTradeData === false && totalTradeDataCount === 0;
    return (
      <div className="row mt-3  bg_white purchase_content">
        <div className="col-lg-12">
          <div className="row mt-4 p-4">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12">
                <select type="text" className="field_input_activity" onChange={this.onChange}>
                  <option value={'usd'}>Show in USD</option>
                  <option value={'btc'}>Show in BTC</option>
                  <option value={'eth'}>Show in ETH</option>
                </select>
              </div>
              <div className="col-lg-9 col-md-9 col-12 mobile-pt-5">
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
                      showClearDate
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
        <div className="col-lg-12 h-100">
          <div className="row mt-2 p-4">
            <div className="col-lg-12 col-md-12">
              {/* visible medium and large devices */}
              <div className="users_list table-responsive d-none d-sm-none d-md-block">
                {
                  isNoDataPresent && <h3>No Data Present</h3>
                }
                <table className="table border_top">
                  <WrapLoading loading={isFetchingTradeData} loadingProps={{ insideTable: true, colSpan: 4 }}>
                    <tbody>
                      {
                        tradeData.map((data, i) => {
                          const cancel = () => {
                            this.props.cancelTrade(data.id);
                          }
                          return (
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
                                  <span className="activity_text_one">{data.toAsset.name} Purchase</span>
                                </div>
                              </td>
                              <td className="vertical_top">
                                Initiated
                              <div className="activity_text_two mt-3">
                                  {moment(data.createdAt).format('MMM DD, YYYY')}
                                </div>
                              </td>
                              {data.state === 'completed' || data.state === 'canceled' ? (<td className="vertical_top">
                                {firstLetterCaps(data.state)}
                                <div className="activity_text_two mt-3">
                                  {moment(data.updatedAt).format('MMM DD, YYYY')}
                                </div>
                              </td>) : (
                                  <td className="vertical_middle">
                                    <div className="activity_text_two">
                                      {firstLetterCaps(data.state)}
                                    </div>
                                  </td>)}
                              {
                                hoveredId === data.id ?
                                  <td className="vertical_middle">
                                    <span className="deny_btn p-2" onClick={cancel}>Cancel</span>
                                  </td> :
                                  <td className="vertical_top courier_type">
                                    {this.state.valueIn === 'usd' && '$'}{formatNumberWithCommas(Number(data[this.state.valueIn + 'Value']).toFixed(2))} {this.state.valueIn.toUpperCase()}
                                    <div className="activity_text_two mt-3">+ {formatNumberWithCommas(data.toAssetAmount)} {data.toAsset.ticker.toUpperCase()}</div>
                                  </td>
                              }
                            </tr>
                          );
                        })
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
                  <WrapLoading loading={isFetchingTradeData} loadingProps={{ insideTable: true, colSpan: 2 }}>
                    <tbody>
                      {
                        tradeData.map((data, i) => (
                          <tr key={`trade_data_mobile_${i}`}>
                            <th>
                              <div className="h-100 text-right table_data_activity">
                                {renderImageForAsset(data.toAsset.ticker)}
                              </div>
                              <div className="text-left table_data_activity ml-2">
                                <span>
                                  {moment(data.createdAt).format('MMM DD, YYYY')}
                                </span>
                                <span>
                                  &nbsp;{firstLetterCaps(data.state)}
                                </span>
                                <br />
                                <br />
                                <span className="activity_text_one">{data.toAsset.name} Purchase</span>
                              </div>
                            </th>
                            <th className="vertical_top courier_type">
                              {this.state.valueIn === 'usd' && '$'}{formatNumberWithCommas(Number(data[this.state.valueIn + 'Value']).toFixed(2))} {this.state.valueIn.toUpperCase()}
                              <div className="activity_text_two mt-3">+ {formatNumberWithCommas(data.toAssetAmount)} {data.toAsset.ticker.toUpperCase()}</div>
                            </th>
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
            totalCount={totalTradeDataCount}
            perPage={10}
            activePage={this.props.activePage}
            changePage={this.props.handleChangePage}
          />
        </div>
      </div>
    );
  }
}

Purchases.propTypes = {
  userDashboard: PropTypes.object.isRequired,
  handleDatesChange: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  globalData: PropTypes.object.isRequired,
};

export default TradeSortHOC(Purchases, true);
