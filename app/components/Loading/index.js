import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import LoadingSpinner from 'img/loading.gif';
import LoadingSpinner from 'img/melotic_spinner.gif';
// import LoadingSpinner from 'img/melotic_spinner_non_trans.gif';

export default class Loading extends Component {
  static propTypes = {
    insideContainer: PropTypes.bool,
    center: PropTypes.bool,
    insideModal: PropTypes.bool,
    floatLeft: PropTypes.bool,
    insideTable: PropTypes.bool,
    colSpan: PropTypes.number,
    rightSideButtonLoading: PropTypes.bool,
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
        <img src={LoadingSpinner} className={`loading-inside-modal ${this.props.floatLeft ? 'float-left' : ''}`} />
      );
    }

    if (this.props.insideTable) {
      return (
        <tbody>
          <tr>
            <td className="text-center" colSpan={this.props.colSpan || 5}>
              <img src={LoadingSpinner} />
            </td>
          </tr>
        </tbody>
      );
    }

    if (this.props.rightSideButtonLoading) {
      return (
        <img src={LoadingSpinner} className={`modal-right-side-button-loading ${this.props.floatLeft ? 'float-left' : ''}`} />
      );
    }
    return (
      <img src={LoadingSpinner} />
    );
  }
}
