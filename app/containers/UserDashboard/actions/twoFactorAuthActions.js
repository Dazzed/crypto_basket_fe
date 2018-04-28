import { createAction } from 'redux-act';

export const PREFIX = 'APP_USER_DASHBOARD';

export const startEnablingTFALogin = createAction(
  `${PREFIX}_START_ENABLING_TFA_LOGIN`,
  twoFactorToken => twoFactorToken
);

export const startDisablingTFALogin = createAction(
  `${PREFIX}_START_DISABLING_TFA_LOGIN`
);

export const performEnablingTFALogin = createAction(
  `${PREFIX}_PERFORM_ENABLING_TFA_LOGIN`,
  (twoFactorToken, otp) => ({
    twoFactorToken,
    otp
  })
);

export const loginTFAEnableSuccess = createAction(
  `${PREFIX}_LOGIN_TFA_ENABLE_SUCCESS`
);

export const loginTFAEnableError = createAction(
  `${PREFIX}_LOGIN_TFA_ENABLE_ERROR`
);

export const loginTFADisableSuccess = createAction(
  `${PREFIX}_LOGIN_TFA_DISABLE_SUCCESS`
);

export const loginTFADisableError = createAction(
  `${PREFIX}_LOGIN_TFA_DISABLE_ERROR`
);

export const startEnablingTFAWithdrawal = createAction(
  `${PREFIX}_START_ENABLING_TFA_WITHDRAWAL`,
  twoFactorToken => twoFactorToken
);

export const startDisablingTFAWithdrawal = createAction(
  `${PREFIX}_START_DISABLING_TFA_WITHDRAWAL`
);

export const performEnablingTFAWithdrawal = createAction(
  `${PREFIX}_PERFORM_ENABLING_TFA_WITHDRAWAL`,
  (twoFactorToken, otp) => ({
    twoFactorToken,
    otp
  })
);

export const withdrawalTFAEnableSuccess = createAction(
  `${PREFIX}_WITHDRAWAL_TFA_ENABLE_SUCCESS`
);

export const withdrawalTFAEnableError = createAction(
  `${PREFIX}_WITHDRAWAL_TFA_ENABLE_ERROR`
);

export const withdrawalTFADisableSuccess = createAction(
  `${PREFIX}_WITHDRAWAL_TFA_DISABLE_SUCCESS`
);

export const withdrawalTFADisableError = createAction(
  `${PREFIX}_WITHDRAWAL_TFA_DISABLE_ERROR`
);

export const updateQrCodeAndManual = createAction(
  `${PREFIX}_UPDATE_QR_CODE_AND_MANUAL`,
  data => data
);

export const openOTPModal = createAction(
  `${PREFIX}_OPEN_OTP_MODAL`
);

export const closeOTPModal = createAction(
  `${PREFIX}_CLOSE_OTP_MODAL`
);

export const setActiveTfaToggleKey = createAction(
  `${PREFIX}_SET_ACTIVE_TFA_TOGGLE_KEY`,
  key => key
);

export const unsetActiveTfaToggleKey = createAction(
  `${PREFIX}_UNSET_ACTIVE_TFA_TOGGLE_KEY`
);

// The action will be called if the user has already opted into TFA and wishes to enable/disable one of the flags.
export const updateTfaEnabledWithOtp = createAction(
  `${PREFIX}_UPDATE_TFA_ENABLED_WITH_OTP`,
  (userId, flagName, value, otp) => ({ userId, flagName, value, otp })
);
