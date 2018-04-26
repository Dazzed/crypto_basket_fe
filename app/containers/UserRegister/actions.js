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

export const performEmailVerification = createAction(
  `${PREFIX}_PERFORM_EMAIL_VERIFICATION`,
  token => token
);

export const emailVerificationSuccess = createAction(
  `${PREFIX}_EMAIL_VERIFICATION_SUCCESS`,
);

export const emailVerificationError = createAction(
  `${PREFIX}_EMAIL_VERIFICATION_ERROR`,
);

export const toggleEmailVerifiedFlag = createAction(
  `${PREFIX}_TOGGLE_EMAIL_VERIFIED_FLAG`,
);
