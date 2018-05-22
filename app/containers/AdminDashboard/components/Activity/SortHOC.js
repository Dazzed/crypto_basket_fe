import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (TargetComponent, fetchPropName) => {
  return class SortHOC extends Component {
    static propTypes = {
      defaultOrderByProp: PropTypes.string.isRequired,
      searchableColumns: PropTypes.array.isRequired,
    };

    state = {
      orderBy: this.props.defaultOrderByProp,
      order: 'asc',
      rowsPerPage: 10,
      page: 1,
      searchTerm: '',
      activityType: 'deposit',
    };

    componentDidMount() {
      this.fetchData();
    }

    fetchData = () => {
      const {
        orderBy, order, rowsPerPage, page, searchTerm, activityType
      } = this.state;
      const {
        searchableColumns = []
      } = this.props;

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
        txType: activityType || 'deposit'
      };
      this.props[fetchPropName]({
        include: 'user',
        offset: rowsPerPage * (page - 1),
        limit: this.state.rowsPerPage,
        order,
        orderBy,
        ...(where ? { where } : {})
      }, searchTerm ? `/api/transfers/searchByUser/${searchTerm}` : null);
    }

    handleRequestSort = (property) => {
      const orderBy = property;
      let order = '';

      if (this.state.orderBy === property) {
        order = this.state.order === 'desc' ? 'asc' : 'desc';
      } else {
        order = 'asc';
      }
      this.setState({
        order,
        orderBy
      }, this.fetchData);
    };

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
        orderBy: this.props.defaultOrderByProp,
        order: 'asc',
        rowsPerPage: 10,
        page: 1,
        searchTerm
      }, this.fetchData);
    }

    onChangeActivityType = evt => {
      this.setState({
        activityType: evt.target.value
      }, this.fetchData);
    }

    render() {
      return (
        <TargetComponent
          {...this.props}
          {...this.state}
          handleRequestSort={this.handleRequestSort}
          handleChangePage={this.handleChangePage}
          onSearch={this.onSearch}
          onChangeActivityType={this.onChangeActivityType}
        />
      );
    }
  };
};
