import { createAction } from 'redux-act';

export const PREFIX = 'APP_USER_DASHBOARD';

export const cancelOperation = createAction(
  `${PREFIX}_CANCEL_OPERATION`
);
