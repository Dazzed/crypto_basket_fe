import { createAction } from 'redux-act';

export const PREFIX = 'APP_MAIN_PAGE';

export const verifyAuth = createAction(`${PREFIX}_VERIFY_AUTH`);
export const authSucess = createAction(
  `${PREFIX}_AUTH_SUCCESS`,
  currentUser => currentUser
);
export const authFailure = createAction(`${PREFIX}_AUTH_FAILURE`);

export const logOutRequest = createAction(
  `${PREFIX}_LOGOUT_REQUEST`
);

export const logOutSuccess = createAction(
  `${PREFIX}_LOGOUT_SUCCESS`
);

export const logOutFailure = createAction(
  `${PREFIX}_LOGOUT_FAILURE`
);
