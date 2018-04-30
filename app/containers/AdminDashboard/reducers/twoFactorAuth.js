import {
  startEnablingTFAAdmin,
  performEnablingTFAAdmin,
  tfaAdminEnableSuccess,
  tfaAdminEnableError,
  openOtpModal,
  closeOtpModal,
  updateQrCodeAndManual
} from '../actions/twoFactorAuth';

export const twoFactorAuthReducer = {
  [startEnablingTFAAdmin]: state => ({
    ...state,
    initiatingTfaForAdmin: true
  }),
  // [performEnablingTFAAdmin]: state => ({
  //   ...state,
  //   isInitiatingTfaForAdmin: true
  // }),
  [tfaAdminEnableSuccess]: state => ({
    ...state,
    initiatingTfaForAdmin: false,
    isInitiatingTfaForAdmin: false,
    isOTPModalOpen: false
  }),
  [tfaAdminEnableError]: state => ({
    ...state,
    initiatingTfaForAdmin: false,
    isInitiatingTfaForAdmin: false,
  }),
  [openOtpModal]: state => ({
    ...state,
    isOTPModalOpen: true
  }),
  [closeOtpModal]: state => ({
    ...state,
    isOTPModalOpen: false
  }),
  [updateQrCodeAndManual]: (state, { qrCode, manualCode }) => ({
    ...state,
    qrCode,
    manualCode
  })
};
