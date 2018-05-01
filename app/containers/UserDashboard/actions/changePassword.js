import { createAction } from 'redux-act';

export const PREFIX = 'APP_USER_DASHBOARD';

export const startChangingPassword = createAction(
  `${PREFIX}_START_CHANGING_PASSWORD`
);

export const confirmChangingPassword = createAction(
  `${PREFIX}_CONFIRM_CHANGING_PASSWORD`,
  (oldPassword, newPassword, toastSuccessCallBack) => ({
    oldPassword,
    newPassword,
    toastSuccessCallBack
  })
);

export const changePasswordSuccess = createAction(
  `${PREFIX}_CHANGE_PASSWORD_SUCCESS`
);

export const changePasswordError = createAction(
  `${PREFIX}_CHANGE_PASSWORD_ERROR`
);
