import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// HOC only to query Trade table
export default (TargetComponent, isBuy) => {
  return class SortHOC extends Component {
    static propTypes = {
      globalData: PropTypes.object.isRequired,
      fetchTradeData: PropTypes.func.isRequired,
    };

    state = {
      startDate: null,
      endDate: null,
      page: 1,
      isBuy,
      limit: 10
    };

    componentDidMount() {
      this.fetchData();
    }

    handleDatesChange = (startDate, endDate) => {
      const cb = startDate && endDate ? this.fetchData : undefined;
      this.setState({ startDate, endDate }, cb);
    }

    handleChangePage = (page) => {
      this.setState({ page }, this.fetchData);
    };

    clearDates = () => {
      this.setState({
        startDate: null,
        endDate: null
      }, this.fetchData);
    }

    fetchData = () => {
      const {
        startDate,
        endDate
      } = this.state;
      let start_range, end_range;
      if (startDate && endDate) {
        start_range = moment(startDate).format('YYYY-MM-DD');
        end_range = moment(endDate).format('YYYY-MM-DD');
      }
      this.props.fetchTradeData({
        limit: this.state.limit,
        offset: this.state.limit * (this.state.page - 1),
        // orderBy: 'createdAt',
        // order: 'DESC',
        include: ['fromAsset', 'toAsset'],
        order: 'createdAt DESC',
        where: {
          isBuy: this.state.isBuy,
          userId: this.props.globalData.currentUser.id
        },
        ...(start_range && end_range ? {
          custom_filter: {
            start_range,
            end_range
          }
        } : {})
      }, '/api/trades');
    }

    render() {
      return (
        <TargetComponent
          {...this.props}
          {...this.state}
          handleDatesChange={this.handleDatesChange}
          handleChangePage={this.handleChangePage}
          clearDates={this.clearDates}
          activePage={this.state.page}
        />
      );
    }
  };
};
