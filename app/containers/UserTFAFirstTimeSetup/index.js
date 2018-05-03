import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectGlobal
} from 'containers/App/selectors';
import TwoFactorEnableModal from 'components/TwoFactorEnableModal';
import OtpModal from 'components/OtpModal';

import makeSelectUserTfafirstTimeSetup from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

export class UserTFAFirstTimeSetup extends React.Component {
  componentWillMount() {
    if (!this.props.globalData.currentUser.isLoggingInFirstTime) {
      this.props.history.replace('/');
    }
  }

  submitOtp = ({ otp }) => {
    const {
      globalData: {
        currentUser: {
          twoFactorToken
        }
      },
      performEnablingTFALogin,
    } = this.props;
    performEnablingTFALogin(
      twoFactorToken,
      otp,
      this.props.history.push.bind(this, '/')
    );
  }

  renderModals = () => {
    const {
      userTfafirsttimesetup: {
        enablingTFALogin,
        isEnablingTFALogin,
        qrCode,
        manualCode,
        isOTPModalOpen
      },
      openOTPModal,
      closeOTPModal,
      cancelOperation,
      globalData
    } = this.props;
    if (isOTPModalOpen) {
      return (
        <OtpModal
          loading={isEnablingTFALogin}
          onCancel={closeOTPModal}
          onSubmit={this.submitOtp}
        />
      );
    }
    if (enablingTFALogin) {
      return (
        <TwoFactorEnableModal
          loading={!qrCode || !manualCode}
          onCancel={cancelOperation}
          openOTPModal={openOTPModal}
          globalData={globalData}
          currentUser={globalData.currentUser}
          qrCode={qrCode}
          manualCode={manualCode}
        />
      );
    }
    return null;
  }

  onIgnoreTFA = () => {
    // simulate a fake success to leave this page
    this.props.loginTFAEnableSuccess();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container-fluid">
        {this.renderModals()}
        <div className="row mt-5">
          <div className="col-sm-8 col-10 col-lg-4 m-auto">
            <h1 className="text-center w-100">Hey, would you like to setup Google Auth right now?</h1>
            <p className="acc_create_text">
              You will need 2-factor authentication to withdraw
            </p>
            <div className="row mt-3">
              <div className="col-sm-12">
                <button
                  type="button"
                  className="btn-create-register"
                  onClick={
                    this.props.startEnablingTFALogin
                      .bind(
                        this,
                        this.props.globalData.currentUser.twoFactorToken
                      )
                  }
                >
                  Let's set it up
                 </button>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-12">
                <p>
                  <a onClick={this.onIgnoreTFA} className="resend_email_label">No thanks, I will setup later.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserTFAFirstTimeSetup.propTypes = {
  globalData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  startEnablingTFALogin: PropTypes.func.isRequired,
  performEnablingTFALogin: PropTypes.func.isRequired,
  openOTPModal: PropTypes.func.isRequired,
  closeOTPModal: PropTypes.func.isRequired,
  cancelOperation: PropTypes.func.isRequired,
  userTfafirsttimesetup: PropTypes.object.isRequired,
  loginTFAEnableSuccess: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  userTfafirsttimesetup: makeSelectUserTfafirstTimeSetup(),
  globalData: makeSelectGlobal()
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userTfafirstTimeSetup', reducer });
const withSaga = injectSaga({ key: 'userTfafirstTimeSetup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserTFAFirstTimeSetup);
