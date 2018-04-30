import { createAction } from 'redux-act';

export const PREFIX = 'APP_ADMIN_DASHBOARD';

// actions when superadmin tries to create admin without having TFA enabled.
export const startEnablingTFAAdmin = createAction(
  `${PREFIX}_START_ENABLING_TFA_ADMIN`,
  twoFactorToken => twoFactorToken
);

export const performEnablingTFAAdmin = createAction(
  `${PREFIX}_PERFORM_ENABLING_TFA_ADMIN`,
  (twoFactorToken, otp) => ({
    twoFactorToken,
    otp
  })
);

export const tfaAdminEnableSuccess = createAction(
  `${PREFIX}_TFA_ADMIN_ENABLE_SUCCESS`
);

export const tfaAdminEnableError = createAction(
  `${PREFIX}_TFA_ADMIN_ENABLE_ERROR`
);
// END actions when superadmin tries to create admin without having TFA enabled.

export const openOtpModal = createAction(
  `${PREFIX}_OPEN_OTP_MODAL`
);

export const closeOtpModal = createAction(
  `${PREFIX}_CLOSE_OTP_MODAL`
);

export const updateQrCodeAndManual = createAction(
  `${PREFIX}_UPDATE_QR_CODE_AND_MANUAL`,
  data => data
);
