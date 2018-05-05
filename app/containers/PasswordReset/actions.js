import { createAction } from 'redux-act';

export const PREFIX = 'PASSWORD_RESET';

export const resetUserPassword = createAction(
  `${PREFIX}_RESET_USER_PASSWORD`,
  (email) => ({ email })
);

export const resetUsername = createAction(
  `${PREFIX}_RESET_USER_NAME`,
  (email) => ({ email })
);


export const setUserPassword = createAction(
  `${PREFIX}_SET_USER_PASSWORD`,
  (content, token) => ({ content, token })
);