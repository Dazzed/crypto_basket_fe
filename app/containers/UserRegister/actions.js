import { createAction } from 'redux-act';

export const PREFIX = 'APP_USER_REGISTER';

export const performCreatingUser = createAction(
  `${PREFIX}_PERFORM_CREATING_USER`,
  (user, callback, toastSuccessCallBack, toastErrorCallBack) => ({
    user,
    callback,
    toastSuccessCallBack,
    toastErrorCallBack
  })
);

export const createUserSuccess = createAction(
  `${PREFIX}_CREATE_USER_SUCCESS`,
  user => user
);
export const createUserFailure = createAction(
  `${PREFIX}_CREATE_USER_FAILURE`
);
