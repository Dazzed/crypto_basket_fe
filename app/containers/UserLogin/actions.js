import { createAction } from 'redux-act';

export const PREFIX = 'LOGIN_PAGE';

export const loginRequest = createAction(
  `${PREFIX}_REQUEST`,
  (credentials, toastSuccessCallBack, toastErrorCallBack) => ({
    credentials, toastSuccessCallBack, toastErrorCallBack
  })
);
export const loginSuccess = createAction(`${PREFIX}_SUCCESS`);
export const loginFailed = createAction(`${PREFIX}_FAILURE`);

