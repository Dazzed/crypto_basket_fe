import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// HOC only to query Transfers table
export default (TargetComponent, activityType) => {
  return class SortHOC extends Component {
    static propTypes = {
      globalData: PropTypes.object.isRequired,
      fetchActivities: PropTypes.func.isRequired,
    };

    state = {
      startDate: null,
      endDate: null,
      page: 1,
      activityType,
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
      this.props.fetchActivities({
        limit: this.state.limit,
        offset: this.state.limit * (this.state.page - 1),
        // order: 'createdAt DESC',
        where: {
          txType: activityType,
          userId: this.props.globalData.currentUser.id
        },
        ...(start_range && end_range ? {
          custom_filter: {
            start_range,
            end_range
          }
        } : {})
      }, '/api/transfers/custom_find?pendingFirst=true&inProgress=true');
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
          refetch={this.fetchData}
        />
      );
    }
  };
};
