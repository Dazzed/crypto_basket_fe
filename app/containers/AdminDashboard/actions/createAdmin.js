import { createAction } from 'redux-act';

export const PREFIX = 'APP_ADMIN_DASHBOARD';

export const startCreatingAdmin = createAction(
  `${PREFIX}_START_CREATING_ADMIN`
);

export const performCreatingAdmin = createAction(
  `${PREFIX}_PERFORM_CREATING_ADMIN`,
  (admin, callback, toastSuccessCallBack, toastErrorCallBack) => ({
    admin,
    callback,
    toastSuccessCallBack,
    toastErrorCallBack
  })
);

export const createAdminSuccess = createAction(
  `${PREFIX}_CREATE_ADMIN_SUCCESS`,
  admin => admin
);

export const createAdminError = createAction(
  `${PREFIX}_CREATE_ADMIN_ERROR`
);
