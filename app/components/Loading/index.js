import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'img/loading.png';

export default class Loading extends Component {
  static propTypes = {
    insideContainer: PropTypes.bool,
    center: PropTypes.bool
  }

  render() {
    if (this.props.insideContainer) {
      return (
        <div className="container-fluid">
          <img src={LoadingSpinner} />
        </div>
      );
    }
    if (this.props.center) {
      return (
        <div className="text-center">
          <img src={LoadingSpinner} />
        </div>
      );
    }
    return (
      <img src={LoadingSpinner} />
    );
  }
}
