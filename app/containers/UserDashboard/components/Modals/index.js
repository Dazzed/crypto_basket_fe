import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TwoFactorEnableModal from './components/TwoFactorEnableModal';
import OtpModal from './components/OtpModal';

export default class Modals extends Component {
  static propTypes = {
    userDashboard: PropTypes.object.isRequired,
    cancelOperation: PropTypes.func.isRequired,
    openOTPModal: PropTypes.func.isRequired,
    closeOTPModal: PropTypes.func.isRequired,
    globalData: PropTypes.object.isRequired,
    performEnablingTFALogin: PropTypes.func.isRequired,
    performEnablingTFAWithdrawal: PropTypes.func.isRequired,
    updateTfaEnabledWithOtp: PropTypes.func.isRequired,
    unsetActiveTfaToggleKey: PropTypes.func.isRequired,
  };

  onSubmitOtp = ({ otp: thizOtp }) => {
    const otp = Number(thizOtp);
    const {
      enablingTFALogin,
      enablingTFAWithdrawal,
      disablingTFALogin,
      disablingTFAWithdrawal,
      activeTfaToggleKey
    } = this.props.userDashboard;

    const {
      globalData: {
        currentUser: {
          twoFactorToken,
          id: userId
        }
      },
      performEnablingTFALogin,
      performEnablingTFAWithdrawal,
      updateTfaEnabledWithOtp
    } = this.props;

    if (enablingTFALogin) {
      performEnablingTFALogin(twoFactorToken, otp);
    } else if (enablingTFAWithdrawal) {
      performEnablingTFAWithdrawal(twoFactorToken, otp);
    } else if (disablingTFALogin) {
      updateTfaEnabledWithOtp(userId, 'twoFactorLoginEnabled', false, otp);
    } else if (disablingTFAWithdrawal) {
      updateTfaEnabledWithOtp(userId, 'twoFactorWithdrawalEnabled', false, otp);
    } else if (activeTfaToggleKey) {
      if (activeTfaToggleKey === 'twoFactorLoginEnabled') {
        updateTfaEnabledWithOtp(userId, 'twoFactorLoginEnabled', true, otp);
      } else {
        updateTfaEnabledWithOtp(userId, 'twoFactorWithdrawalEnabled', true, otp);
      }
    }
  }

  render() {
    const {
      userDashboard,
      userDashboard: {
        enablingTFALogin,
        enablingTFAWithdrawal,
        isOTPModalOpen,
        qrCode,
        manualCode
      },
      cancelOperation,
      openOTPModal,
      closeOTPModal,
      unsetActiveTfaToggleKey,
      globalData
    } = this.props;

    if (isOTPModalOpen) {
      const didUserOptInTFAAlready = twoFactorLoginEnabled || twoFactorWithdrawalEnabled;
      let onCancel;
      if (didUserOptInTFAAlready) {
        onCancel = () => {
          closeOTPModal();
          unsetActiveTfaToggleKey();
        };
      } else {
        onCancel = () => {
          closeOTPModal();
        };
      }
      const loading = (
        userDashboard.isEnablingTFALogin ||
        userDashboard.isEnablingTFAWithdrawal ||
        userDashboard.isDisablingTFALogin ||
        userDashboard.isDisablingTFAWithdrawal
      );
      return (
        <OtpModal
          loading={loading}
          onCancel={onCancel}
          onSubmit={this.onSubmitOtp}
        />
      );
    }

    const {
      twoFactorLoginEnabled,
      twoFactorWithdrawalEnabled
    } = globalData.currentUser;
    // We dont wanna show the user the qrcode modal if he has already opted for login or withdrawal.

    if (enablingTFALogin) {
      const loading = userDashboard.isEnablingTFALogin || !qrCode || !manualCode;
      return (
        <TwoFactorEnableModal
          loading={loading}
          onCancel={cancelOperation}
          enablingTFALogin
          qrCode={qrCode}
          manualCode={manualCode}
          globalData={globalData}
          openOTPModal={openOTPModal}
        />
      );
    }

    if (enablingTFAWithdrawal) {
      const loading = userDashboard.isEnablingTFAWithdrawal || !qrCode || !manualCode;
      return (
        <TwoFactorEnableModal
          loading={loading}
          onCancel={cancelOperation}
          enablingTFALogin
          qrCode={qrCode}
          manualCode={manualCode}
          globalData={globalData}
          openOTPModal={openOTPModal}
        />
      );
    }
    return null;
  }
}
