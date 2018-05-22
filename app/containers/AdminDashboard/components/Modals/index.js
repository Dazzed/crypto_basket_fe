import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OtpModal from 'components/OtpModal';
import TwoFactorEnableModal from 'components/TwoFactorEnableModal';
import CreateAdminModal from './CreateAdmin';
import CreateUserModal from './CreateUser';

export default class Modals extends Component {
  onSubmitOtp = ({ otp: thizOtp }) => {
    const otp = String(thizOtp);
    const {
      isAdmin,
      isSuperAdmin,
      globalData: {
        currentUser: {
          twoFactorToken,
          id: userId
        }
      },
    } = this.props;
    if (isSuperAdmin) {
      this.props.performEnablingTFAAdmin(twoFactorToken, otp);
    }
  }

  onCreateAdmin = values => {
    const {
      performCreatingAdmin
    } = this.props;
    performCreatingAdmin(
      values,
      null,
      this.props.showToastSuccess,
      this.props.showToastError
    );
  }

  onCreateUser = values => {
    const {
      performCreatingUser
    } = this.props;
    performCreatingUser(
      values,
      null,
      this.props.showToastSuccess,
      this.props.showToastError
    );
  }

  render() {
    const {
      adminDashboard: {
        isOTPModalOpen,
        isInitiatingTfaForAdmin,
        initiatingTfaForAdmin,
        qrCode,
        manualCode,
        creatingAdmin,
        isCreatingAdmin,
        creatingUser,
        isCreatingUser
      },
      globalData,
      isSuperAdmin,
      openOtpModal,
      closeOtpModal,
      cancelOperation
    } = this.props;
    if (isOTPModalOpen) {
      let loading, onCancel;
      if (isSuperAdmin) {
        loading = isInitiatingTfaForAdmin;
        onCancel = closeOtpModal;
      }
      return (
        <OtpModal
          loading={loading}
          onCancel={onCancel}
          onSubmit={this.onSubmitOtp}
        />
      );
    }
    if (initiatingTfaForAdmin) {
      return (
        <TwoFactorEnableModal
          loading={!qrCode || !manualCode}
          onCancel={cancelOperation}
          qrCode={qrCode}
          manualCode={manualCode}
          globalData={globalData}
          openOTPModal={openOtpModal}
          purpose="create an admin"
        />
      );
    }
    if (creatingAdmin) {
      return (
        <CreateAdminModal
          loading={isCreatingAdmin}
          onSubmit={this.onCreateAdmin}
          onCancel={cancelOperation}
        />
      );
    }
    if (creatingUser) {
      return (
        <CreateUserModal
          loading={isCreatingUser}
          onSubmit={this.onCreateUser}
          onCancel={cancelOperation}
        />
      );
    }
    return null;
  }
}

Modals.propTypes = {
  adminDashboard: PropTypes.object.isRequired,
  cancelOperation: PropTypes.func.isRequired,
  openOtpModal: PropTypes.func.isRequired,
  globalData: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool,
  closeOtpModal: PropTypes.func.isRequired,
  performEnablingTFAAdmin: PropTypes.func.isRequired,
  performCreatingAdmin: PropTypes.func.isRequired,
  performCreatingUser: PropTypes.func.isRequired,
  showToastSuccess: PropTypes.func.isRequired,
  showToastError: PropTypes.func.isRequired,
};
