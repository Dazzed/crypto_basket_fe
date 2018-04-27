import React, { Component, Fragment } from 'react';
import { Modal } from 'reactstrap';
import PropTypes from 'prop-types';

import Loading from 'components/Loading';

export default class TwoFactorEnableModal extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    openOTPModal: PropTypes.func.isRequired,
    enablingTFALogin: PropTypes.bool,
    globalData: PropTypes.object.isRequired,
    qrCode: PropTypes.string,
    manualCode: PropTypes.string,
  };

  renderModalContent = () => {
    const {
      loading,
      globalData,
      qrCode,
      manualCode,
      onCancel,
      openOTPModal
    } = this.props;
    if (loading) {
      return <Loading insideModal />;
    }
    return (
      <Fragment>
        <button onClick={onCancel} type="button" className="close_google_auth close text-right ml-auto mr-3" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="row justify-content-center">
          <div className="col-lg-12 p-5">
            <p className="create_GA_popup_text">
              Create your GoogleAuth Code
            </p>
            <p className="popup_para_text">
              You can enable Google Time based One Time Password(TOTP) Two-factor Authentication to further protect your account.when it's enable,you are required to input the TOTP every time you login or withdraw funds.if you have an iOS or Android smartphone,you can download the Google Authenticator application to enable it.In case  you don't have a smart phone available, you can use the Google Authenticator on windows
            </p>
            <img className="google_auth_image" src={qrCode} />
            <p className="popup_under_text">
              Optionallly,enter this code: &nbsp;<span className="popup_under_text_1">{manualCode}</span><br />
              And make sure your account is set to:<span className="popup_under_text_1">{globalData.email}</span>
            </p>
            <button
              type="button"
              className="btn-create-register"
              onClick={openOTPModal}
            >
              Confirm Setup
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
