import { createAction } from 'redux-act';

export const PREFIX = 'PASSWORD_RESET';

export const resetUserPassword = createAction(
  `${PREFIX}_RESET_USER_PASSWORD`,
  (email) => ({ email })
);