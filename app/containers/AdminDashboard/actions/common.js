import { createAction } from 'redux-act';

export const PREFIX = 'APP_ADMIN_DASHBOARD';

export const cancelOperation = createAction(
  `${PREFIX}_CANCEL_OPERATION`
);
