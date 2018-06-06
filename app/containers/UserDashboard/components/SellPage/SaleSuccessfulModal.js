import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import PropTypes from 'prop-types';

import ImgCheck from 'img/img_check.png';
import ImgCheck_2X from 'img/img_check@2x.png';

export default class SaleSuccessfulModal extends Component {
  static propTypes = {
    saleCloseTradeSuccessModal: PropTypes.func.isRequired,
    onNavigateToActivity: PropTypes.func.isRequired,
  };

  render() {
    const {
      saleCloseTradeSuccessModal,
      onNavigateToActivity
    } = this.props;
    return (
      <Modal isOpen>
        <button onClick={saleCloseTradeSuccessModal} type="button" className="close_google_auth close text-right ml-auto mr-3" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="row">
          <div className="col-lg-12 pb-4 pl-3">
            <p className="create_GA_popup_text">
              Your sale was successfull!
            </p>
          </div>
        </div>
        <div className="row">
          <img src={ImgCheck_2X} className="buy_success_image" />
        </div>
        <div className="row pt-5 pb-4">
          <div className="col-md-6">
            <button
              className="btn-create-register naked-green-btn"
              onClick={onNavigateToActivity}
            >
              Check Activity
            </button>
          </div>
          <div className="col-md-6">
            <button
              onClick={saleCloseTradeSuccessModal}
              className="btn-confirm-sale"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
