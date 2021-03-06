import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import _ from 'lodash';
import Loading from 'components/Loading';

export default class ConfirmPurchaseModal extends Component {
  static propTypes = {
    estimateTradeResult: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    isInitiatingTrade: PropTypes.bool.isRequired,
  };

  render() {
    const {
      onCancel,
      onConfirm,
      estimateTradeResult: {
        fromAssetAmount,
        toAssetAmount,
        fromAsset,
        toAsset
      },
      isInitiatingTrade
    } = this.props;

    return (
      <Modal isOpen>
        <button onClick={onCancel} type="button" className="close_google_auth close text-right ml-auto mr-3" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="row">
          <div className="col-lg-12 pb-4 pl-5">
            <p className="create_GA_popup_text">
              Please confirm purchase
            </p>
            <div className="col-12">
              <p style={{ textAlign: 'left', color: 'black' }}>
                You are about to
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 pl-5 pr-5">
            <div style={{ borderTop: '1px solid #beccc2' }}>
              <span className="float-left mt-2">
                <p>Buy</p>
              </span>
              <span className="float-right">
                <p>{_.round(parseFloat(toAssetAmount), 4)} {toAsset.ticker.toUpperCase()}</p>
              </span>
            </div>
          </div>
          <div className="col-12 pl-5 pr-5">
            <div style={{ borderTop: '1px solid #beccc2' }}>
              <span className="float-left mt-2">
                <p>Using</p>
              </span>
              <span className="float-right">
                <p>{_.round(parseFloat(fromAssetAmount), 4)} {fromAsset.ticker.toUpperCase()}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="row pt-5 pb-4">
          <div className="col-md-6">
            <button
              className="btn-create-register naked-green-btn"
              onClick={onCancel}
              disabled={isInitiatingTrade}
            >
              Cancel
              </button>
          </div>
          {
            isInitiatingTrade ?
              <Loading rightSideButtonLoading /> :
              <div className="col-md-6">
                <button
                  onClick={onConfirm}
                  className="btn-confirm-purchase"
                  style={{width: '75% !important'}}
                >
                  Confirm Purchase
              </button>
              </div>}
        </div>
      </Modal>
    );
  }
}
