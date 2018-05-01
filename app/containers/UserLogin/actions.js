import { createAction } from 'redux-act';

export const PREFIX = 'LOGIN_PAGE';

export const loginRequest = createAction(
  `${PREFIX}_REQUEST`,
  (credentials, toastSuccessCallBack, toastErrorCallBack, tfaRequired, twoFactorToken) => ({
    credentials, toastSuccessCallBack, toastErrorCallBack, tfaRequired, twoFactorToken
  })
);
export const loginSuccess = createAction(`${PREFIX}_SUCCESS`);
export const loginFailed = createAction(`${PREFIX}_FAILURE`);
export const loginTFANeeded = createAction(
    `${PREFIX}_TFA_FAILURE`, 
    (tfaToken) => ({
        tfaToken
    })
);

