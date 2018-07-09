import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChangePasswordModal from 'components/ChangePasswordModal';
import OtpModal from 'components/OtpModal';
import TwoFactorEnableModal from 'components/TwoFactorEnableModal';
// Buy page modals
import PurchaseUnsuccessfulModal from '../BuyPage/PurchaseUnsuccessfulModal';
import ConfirmPurchaseModal from '../BuyPage/ConfirmPurchaseModal';
import PurchaseSuccessfulModal from '../BuyPage/PurchaseSuccessfulModal';

// sell page modals
import SaleUnsuccessfulModal from '../SellPage/SaleUnsuccessfulModal';
import ConfirmSaleModal from '../SellPage/ConfirmSaleModal';
import SaleSuccessfulModal from '../SellPage/SaleSuccessfulModal';

// withdrawal page modals
import WithdrawalUnsuccessfulModal from '../WithdrawalPage/WithdrawalUnsuccessfulModal';
import ConfirmWithdrawalModal from '../WithdrawalPage/ConfirmWithdrawalModal';
import WithdrawalSuccessfulModal from '../WithdrawalPage/WithdrawalSuccessfulModal';

// deposit modals
import DepositModal from './DepositModal';

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
    confirmChangingPassword: PropTypes.func.isRequired,
    // buy props
    hidePurchaseUnsuccessfulModal: PropTypes.func.isRequired,
    hideConfirmPurchaseModal: PropTypes.func.isRequired,
    performInitiatingTrade: PropTypes.func.isRequired,
    closeTradeSuccessModal: PropTypes.func.isRequired,
    // sell props
    hideSaleUnsuccessfulModal: PropTypes.func.isRequired,
    hideConfirmSaleModal: PropTypes.func.isRequired,
    salePerformInitiatingTrade: PropTypes.func.isRequired,
    saleCloseTradeSuccessModal: PropTypes.func.isRequired,
    hideWithdrawalUnsuccessfulModal: PropTypes.func.isRequired,
    hideConfirmWithdrawalModal: PropTypes.func.isRequired,
    withdrawalPerformInitiatingTrade: PropTypes.func.isRequired,
    withdrawalCloseTradeSuccessModal: PropTypes.func.isRequired,
    showToastSuccess: PropTypes.func.isRequired,
    // showToastError: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  onSubmitOtp = ({ otp: thizOtp }) => {
    const otp = String(thizOtp);
    const {
      enablingTFALogin,
      enablingTFAWithdrawal,
      disablingTFALogin,
      disablingTFAWithdrawal,
      activeTfaToggleKey,
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

  onChangePassword = values => {
    this.props.confirmChangingPassword(
      values.oldPassword,
      values.newPassword,
      this.props.showToastSuccess
    );
  }

  render() {
    const {
      userDashboard,
      userDashboard: {
        enablingTFALogin,
        enablingTFAWithdrawal,
        isOTPModalOpen,
        qrCode,
        manualCode,
        // buy props
        purchaseUnsuccessfulModalOpen,
        purchaseUnsuccessfulModalContent,
        isConfirmPurchaseModalOpen,
        estimateTradeResult,
        isTradeSuccessModalOpen,
        isInitiatingTrade,
        // sell props
        saleUnsuccessfulModalOpen,
        saleUnsuccessfulModalContent,
        isConfirmSaleModalOpen,
        saleEstimateTradeResult,
        saleIsTradeSuccessModalOpen,
        saleIsInitiatingTrade,
        withdrawalSuccessModalOpen,
        withdrawalInitiating,
        withdrawalUnsuccessfulModalOpen,
        isConfirmWithdrawalModalOpen,
        depositingCurrency,
        withdrawalInfo
      },
      cancelOperation,
      openOTPModal,
      closeOTPModal,
      unsetActiveTfaToggleKey,
      globalData,
      // buy actions
      hidePurchaseUnsuccessfulModal,
      hideConfirmPurchaseModal,
      performInitiatingTrade,
      closeTradeSuccessModal,
      // sell actions
      hideSaleUnsuccessfulModal,
      hideConfirmSaleModal,
      salePerformInitiatingTrade,
      saleCloseTradeSuccessModal,
      // withdrawal actions
      hideWithdrawalUnsuccessfulModal,
      cancelWithdrawal,
      submitWithdrawal,
      withdrawalInitiate,
      withdrawalCloseSuccessModal,
      // deposit actions
      openDepositModal,
      closeDepositModal
    } = this.props;
    console.log('withdral info', withdrawalInfo, this.props.userDashboard);
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

    if (userDashboard.changingPassword) {
      const {
        isChangingPassword
      } = userDashboard;
      return (
        <ChangePasswordModal
          loading={isChangingPassword}
          onCancel={cancelOperation}
          onSubmit={this.onChangePassword}
        />
      );
    }
    // buy modals
    if (purchaseUnsuccessfulModalOpen) {
      return (
        <PurchaseUnsuccessfulModal
          onCancel={hidePurchaseUnsuccessfulModal}
          purchaseUnsuccessfulModalContent={purchaseUnsuccessfulModalContent}
        />
      );
    }

    if (isConfirmPurchaseModalOpen) {
      return (
        <ConfirmPurchaseModal
          estimateTradeResult={estimateTradeResult}
          onCancel={hideConfirmPurchaseModal}
          onConfirm={performInitiatingTrade}
          isInitiatingTrade={isInitiatingTrade}
        />
      );
    }

    if (isTradeSuccessModalOpen) {
      return (
        <PurchaseSuccessfulModal
          closeTradeSuccessModal={closeTradeSuccessModal}
          onNavigateToActivity={() => this.props.history.push('/dashboard/activity')}
        />
      );
    }

    // sell modals
    if (saleUnsuccessfulModalOpen) {
      return (
        <SaleUnsuccessfulModal
          onCancel={hideSaleUnsuccessfulModal}
          saleUnsuccessfulModalContent={saleUnsuccessfulModalContent}
        />
      );
    }

    if (isConfirmSaleModalOpen) {
      return (
        <ConfirmSaleModal
          saleEstimateTradeResult={saleEstimateTradeResult}
          onCancel={hideConfirmSaleModal}
          onConfirm={salePerformInitiatingTrade}
          saleIsInitiatingTrade={saleIsInitiatingTrade}
        />
      );
    }

    if (saleIsTradeSuccessModalOpen) {
      return (
        <SaleSuccessfulModal
          saleCloseTradeSuccessModal={saleCloseTradeSuccessModal}
          onNavigateToActivity={() => this.props.history.push('/dashboard/activity')}
        />
      );
    }

    // withdrawal modals
    if (withdrawalUnsuccessfulModalOpen) {
      return (
        <WithdrawalUnsuccessfulModal
          onCancel={hideWithdrawalUnsuccessfulModal}
          withdrawalUnsuccessfulModalContent={withdrawalUnsuccessfulModalContent}
        />
      );
    }

    if (isConfirmWithdrawalModalOpen) {
      return (
        <ConfirmWithdrawalModal
          onCancel={cancelWithdrawal}
          withdrawalInfo={withdrawalInfo}
          submitWithdrawal={submitWithdrawal}
        />
      );
    }

    if (withdrawalSuccessModalOpen) {
      return (
        <WithdrawalSuccessfulModal
          withdrawalCloseTradeSuccessModal={withdrawalCloseTradeSuccessModal}
          onNavigateToActivity={() => this.props.history.push('/dashboard/activity')}
        />
      );
    }
    if (depositingCurrency) {
      return (
        <DepositModal
          onCancel={closeDepositModal}
          globalData={globalData}
          depositingCurrency={depositingCurrency}
        />
      );
    }
    return null;
  }
}
