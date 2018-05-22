import {
  fetchActivities,
  fetchActivitiesSuccess,
  fetchActivitiesError
} from '../actions/activity';

const spreadState = (state, obj) => ({
  ...state,
  ...(typeof obj === 'function' ? obj() : obj)
});

export const activitiesReducer = {
  [fetchActivities]: state => spreadState(state, {
    totalActivitiesCount: 0,
    errorFetchingActivities: false,
    activities: [],
    isFetchingActivities: true,
  }),
  [fetchActivitiesSuccess]: (state, { data: activities, totalCount }) => spreadState(state, {
    activities,
    totalActivitiesCount: totalCount,
    isFetchingActivities: false,
  }),
  [fetchActivitiesError]: state => spreadState(state, {
    errorFetchingActivities: true,
    isFetchingActivities: false,
  })
};
