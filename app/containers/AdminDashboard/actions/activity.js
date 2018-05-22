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
