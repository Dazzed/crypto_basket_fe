import {
  startEnablingTFALogin,
  startDisablingTFALogin,
  performEnablingTFALogin,
  performDisablingTFALogin,
  loginTFAEnableSuccess,
  loginTFAEnableError,
  loginTFADisableSuccess,
  loginTFADisableError,
  startEnablingTFAWithdrawal,
  startDisablingTFAWithdrawal,
  performEnablingTFAWithdrawal,
  performDisablingTFAWithdrawal,
  withdrawalTFAEnableSuccess,
  withdrawalTFAEnableError,
  withdrawalTFADisableSuccess,
  withdrawalTFADisableError,
  updateQrCodeAndManual,
  openOTPModal,
  closeOTPModal,
  setActiveTfaToggleKey,
  updateTfaEnabledWithOtp,
  unsetActiveTfaToggleKey
} from '../actions/twoFactorAuthActions';

export const twoFactorAuthReducer = {
  [startEnablingTFALogin]: state => ({
    ...state,
    enablingTFALogin: true,
  }),
  [startDisablingTFALogin]: state => ({
    ...state,
    disablingTFALogin: true,
    isOTPModalOpen: true
  }),
  [performEnablingTFALogin]: state => ({
    ...state,
    isEnablingTFALogin: true
  }),
  [performDisablingTFALogin]: state => ({
    ...state,
    isDisablingTFALogin: true
  }),
  [loginTFAEnableSuccess]: state => ({
    ...state,
    enablingTFALogin: false,
    isEnablingTFALogin: false,
    isOTPModalOpen: false
  }),
  [loginTFAEnableError]: state => ({
    ...state,
    isEnablingTFALogin: false
  }),
  [loginTFADisableSuccess]: state => ({
    ...state,
    disablingTFALogin: false,
    isDisablingTFALogin: false,
    isOTPModalOpen: false
  }),
  [loginTFADisableError]: state => ({
    ...state,
    isDisablingTFALogin: false
  }),
  [startEnablingTFAWithdrawal]: state => ({
    ...state,
    enablingTFAWithdrawal: true
  }),
  [startDisablingTFAWithdrawal]: state => ({
    ...state,
    disablingTFAWithdrawal: true,
    isOTPModalOpen: true
  }),
  [performEnablingTFAWithdrawal]: state => ({
    ...state,
    isEnablingTFAWithdrawal: true
  }),
  [performDisablingTFAWithdrawal]: state => ({
    ...state,
    isDisablingTFAWithdrawal: true
  }),
  [withdrawalTFAEnableSuccess]: state => ({
    ...state,
    enablingTFAWithdrawal: false,
    isEnablingTFAWithdrawal: false,
    isOTPModalOpen: false
  }),
  [withdrawalTFAEnableError]: state => ({
    ...state,
    isEnablingTFAWithdrawal: false
  }),
  [withdrawalTFADisableSuccess]: state => ({
    ...state,
    disablingTFAWithdrawal: false,
    isDisablingTFAWithdrawal: false,
    isOTPModalOpen: false
  }),
  [withdrawalTFADisableError]: state => ({
    ...state,
    isDisablingTFAWithdrawal: false
  }),
  [updateQrCodeAndManual]: (state, { qrCode, manualCode }) => ({
    ...state,
    qrCode,
    manualCode
  }),
  [openOTPModal]: state => ({
    ...state,
    isOTPModalOpen: true
  }),
  [closeOTPModal]: state => ({
    ...state,
    isOTPModalOpen: false
  }),
  [setActiveTfaToggleKey]: (state, key) => ({
    ...state,
    activeTfaToggleKey: key
  }),
  [unsetActiveTfaToggleKey]: state => ({
    ...state,
    activeTfaToggleKey: null
  }),
  [updateTfaEnabledWithOtp]: (state, { flagName, value }) => {
    /* eslint-disable no-lonely-if */
    let key = null;
    if (flagName === 'twoFactorLoginEnabled') {
      if (value === true) {
        key = 'isEnablingTFALogin';
      } else {
        key = 'isDisablingTFALogin';
      }
    } else {
      if (value === true) {
        key = 'isEnablingTFAWithdrawal';
      } else {
        key = 'isDisablingTFAWithdrawal';
      }
    }
    return {
      ...state,
      [key]: value
    };
  }
};
