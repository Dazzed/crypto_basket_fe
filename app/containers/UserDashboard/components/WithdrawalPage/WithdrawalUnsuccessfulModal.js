import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';

export default class WithdrawalUnsuccessfulModal extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    withdrawalUnsuccessfulModalContent: PropTypes.string.isRequired,
  };

  render() {
    const {
      onCancel,
      withdrawalUnsuccessfulModalContent
    } = this.props;
    return (
      <Modal isOpen>
        <button onClick={onCancel} type="button" className="close_google_auth close text-right ml-auto mr-3" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="row justify-content-center">
          <div className="col-lg-12 p-5">
            <p className="create_GA_popup_text">
              You withdrawal was unsuccessful
              </p>
            <p className="popup_para_text">
              {withdrawalUnsuccessfulModalContent}
            </p>
            <button
              type="button"
              className="btn-block btn-create-register"
              onClick={onCancel}
            >
              Back
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
