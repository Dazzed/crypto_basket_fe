import { createAction } from 'redux-act';

export const PREFIX = 'APP_ADMIN_DASHBOARD';

export const fetchActivities = createAction(
  `${PREFIX}_FETCH_ACTIVITIES`,
  (filter, url) => ({ filter, url })
);
export const fetchActivitiesSuccess = createAction(
  `${PREFIX}_FETCH_ACTIVITIES_SUCCESS`,
  activities => activities
);
export const fetchActivitiesError = createAction(
  `${PREFIX}_FETCH_ACTIVITIES_ERROR`
);

export const approveWithdraw = createAction(
  `${PREFIX}_APPROVE_WITHDRAWAL`, (id, cb) => ({id, cb})
);

export const denyWithdraw = createAction(
  `${PREFIX}_DENY_WITHDRAWAL`, (id, cb) => ({id, cb})
);
