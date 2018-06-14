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
      page: 0,
      searchTerm: ''
    };

    componentDidMount() {
      this.fetchData();
    }

    fetchData = () => {
      const {
        orderBy, order, rowsPerPage, page, searchTerm
      } = this.state;
      const {
        searchableColumns = []
      } = this.props;
      const where = (() => {
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
        return null;
      })();
      console.log('this.props', this.props, 'fetchPropName', fetchPropName);
      this.props[fetchPropName]({
        offset: rowsPerPage * page,
        limit: this.state.rowsPerPage,
        order,
        orderBy,
        ...(where ? { where } : {})
      });
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

    handleChangePage = (event, page) => {
      this.setState({ page }, this.fetchData);
    };

    onSearch = evt => {
      const searchTerm = evt.target.value;
      // reset state on Search
      this.setState({
        orderBy: this.props.defaultOrderByProp,
        order: 'asc',
        rowsPerPage: 10,
        page: 0,
        searchTerm
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
        />
      );
    }
  };
};
