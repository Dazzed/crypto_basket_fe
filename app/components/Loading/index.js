import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'img/loading.gif';

export default class Loading extends Component {
  static propTypes = {
    insideContainer: PropTypes.bool,
    center: PropTypes.bool,
    insideModal: PropTypes.bool
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
    if (this.props.insideModal) {
      return (
        <img src={LoadingSpinner} className="loading-inside-modal" />
      );
    }
    return (
      <img src={LoadingSpinner} />
    );
  }
}
