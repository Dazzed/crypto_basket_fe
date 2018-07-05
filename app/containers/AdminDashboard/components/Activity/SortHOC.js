import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default (TargetComponent, fetchPropName) => {
  return class SortHOC extends Component {
    static propTypes = {
      defaultOrderByProp: PropTypes.string.isRequired,
      // searchableColumns: PropTypes.array.isRequired,
      targetUserId: PropTypes.string,
      defaultActivityType: PropTypes.string,
    };

    state = {
      // orderBy: this.props.defaultOrderByProp,
      order: `${this.props.defaultOrderByProp} desc`,
      rowsPerPage: 10,
      page: 1,
      searchTerm: '',
      activityType: this.props.defaultActivityType || 'deposit',
      startDate: null,
      endDate: null,
      isChangingActivityType: false
    };

    componentDidMount() {
      this.fetchData();
    }

    handleDatesChange = (startDate, endDate) => {
      const cb = startDate && endDate ? this.fetchData : undefined;
      this.setState({ startDate, endDate }, cb);
    }

    clearDates = () => {
      this.setState({
        startDate: null,
        endDate: null
      }, this.fetchData);
    }

    fetchData = () => {
      const {
        order, rowsPerPage, page, searchTerm, activityType
      } = this.state;
      const {
        startDate,
        endDate
      } = this.state;
      let start_range, end_range;
      if (startDate && endDate) {
        start_range = moment(startDate).format('YYYY-MM-DD');
        end_range = moment(endDate).format('YYYY-MM-DD');
      }
      const {
        searchableColumns = []
      } = this.props;

      const isTradeModel = ['purchase', 'sale'].includes(activityType);
      const where = {
        ...(() => {
          // search term if below not used
          if (searchTerm) {
            if (searchableColumns.length > 1) {
              return {
                or: searchableColumns.map(sc => ({
                  [sc]: {
                    like: `%${searchTerm}%`
                  }
                }))
              };
            } else if (searchableColumns.length === 1) {
              return {
                [searchableColumns[0]]: {
                  like: `%${searchTerm}%`
                }
              };
            }
          }
          return {};
        })(),
        // txType: activityType || 'deposit'
        // isBuy column is boolean in trade table and txType is string in transfer table
        ...(isTradeModel ? { isBuy: activityType === 'purchase' } : { txType: activityType }),
        ...(this.props.targetUserId ? { userId: Number(this.props.targetUserId) } : {})
      };
      const URL_TO_FETCH = isTradeModel ? '/api/trades' : '/api/transfers';
      this.props[fetchPropName]({
        include: isTradeModel ? ['fromAsset', 'toAsset', 'user'] : 'user',
        offset: rowsPerPage * (page - 1),
        limit: this.state.rowsPerPage,
        order,
        ...(where ? { where } : {}),
        ...(start_range && end_range ? {
          custom_filter: {
            start_range,
            end_range
          }
        } : {})
      }, searchTerm ? `${URL_TO_FETCH}/searchByUser/${searchTerm}` : URL_TO_FETCH);
      if (this.state.isChangingActivityType) {
        this.setState({ isChangingActivityType: false });
      }
    }

    // handleRequestSort = (property) => {
    //   const orderBy = property;
    //   let order = '';

    //   if (this.state.orderBy === property) {
    //     order = this.state.order === 'desc' ? 'asc' : 'desc';
    //   } else {
    //     order = 'asc';
    //   }
    //   this.setState({
    //     order,
    //     orderBy
    //   }, this.fetchData);
    // };

    handleChangePage = (page) => {
      this.setState({ page }, this.fetchData);
    };

    onSearch = evt => {
      const searchTerm = evt.target.value;
      if (!searchTerm) {
        return this.setState({
          searchTerm: ''
        }, this.fetchData);
      }
      // reset state on Search
      return this.setState({
        // orderBy: this.props.defaultOrderByProp,
        // order: 'desc',
        rowsPerPage: 10,
        page: 1,
        searchTerm
      }, this.fetchData);
    }

    onChangeActivityType = evt => {
      this.setState({
        activityType: evt.target.value,
        isChangingActivityType: true
      }, this.fetchData);
    }

    render() {
      return (
        <TargetComponent
          {...this.props}
          {...this.state}
          // handleRequestSort={this.handleRequestSort}
          handleChangePage={this.handleChangePage}
          onSearch={this.onSearch}
          onChangeActivityType={this.onChangeActivityType}
          handleDatesChange={this.handleDatesChange}
          clearDates={this.clearDates}
        />
      );
    }
  };
};
