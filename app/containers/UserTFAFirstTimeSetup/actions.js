import { createAction } from 'redux-act';

export const PREFIX = 'APP_USER_TFA_SETUP';

export const startEnablingTFALogin = createAction(
  `${PREFIX}_START_ENABLING_TFA_LOGIN`,
  twoFactorToken => twoFactorToken
);

export const performEnablingTFALogin = createAction(
  `${PREFIX}_PERFORM_ENABLING_TFA_LOGIN`,
  (twoFactorToken, otp, callback) => ({
    twoFactorToken,
    otp,
    callback
  })
);

export const updateQrCodeAndManual = createAction(
  `${PREFIX}_UPDATE_QR_CODE_AND_MANUAL`,
  data => data
);

export const loginTFAEnableSuccess = createAction(
  `${PREFIX}_LOGIN_TFA_ENABLE_SUCCESS`
);

export const loginTFAEnableError = createAction(
  `${PREFIX}_LOGIN_TFA_ENABLE_ERROR`
);

export const openOTPModal = createAction(
  `${PREFIX}_OPEN_OTP_MODAL`
);

export const closeOTPModal = createAction(
  `${PREFIX}_CLOSE_OTP_MODAL`
);

export const cancelOperation = createAction(
  `${PREFIX}_CANCEL_OPERATION`
);
