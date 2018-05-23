import React, { Component, Fragment } from 'react';
import { Modal } from 'reactstrap';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Loading from 'components/Loading';

export default class DepositModal extends Component {
  state = {
    copyState: 'Copy'
  };

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    globalData: PropTypes.object,
    depositingCurrency: PropTypes.string.isRequired,
  };

  onClickCopy = () => {
    this.setState({
      copyState: 'Copied'
    }, () => {
      setTimeout(() => {
        this.setState({ copyState: 'Copy' });
      }, 1200);
    });
  }

  renderModalContent = () => {
    const {
      onCancel,
      globalData,
      depositingCurrency
    } = this.props;

    const { copyState } = this.state;

    const { qrCode, address } = globalData.currentUser.wallets.find(w => w.assetId === depositingCurrency);
    return (
      <Fragment>
        <button onClick={onCancel} type="button" className="close_google_auth close text-right ml-auto mr-3" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="row justify-content-center">
          <div className="col-lg-12 p-5">
            <p className="create_GA_popup_text">
              Deposit {depositingCurrency.toUpperCase()} to Melotic
            </p>
            <p className="popup_para_text">
              Only send {depositingCurrency.toUpperCase()} to this address. Sending other asset will result in permanent loss.
            </p>
            <img className="google_auth_image" src={qrCode} />
            <div className="deposit-clipboard-container">
              <span id="deposit-address-copy" className="deposit-address">{address}</span>
              {/* <input type="text" id="deposit-address-copy" className="deposit-address" disabled value={address} /> */}
              <CopyToClipboard text={address}>
                <button onClick={this.onClickCopy} className="float-right btn-create-register btn-copy-clipboard">{copyState}</button>
              </CopyToClipboard>
            </div>
            <button
              type="button"
              className="w-50 btn-create-register mt-5"
              onClick={onCancel}
            >
              Done
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Modal isOpen>
        {this.renderModalContent()}
      </Modal>
    );
  }
}
