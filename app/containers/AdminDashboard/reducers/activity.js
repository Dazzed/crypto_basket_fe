import {
  fetchActivities,
  fetchActivitiesSuccess,
  fetchActivitiesError,
  replaceActivity
} from '../actions/activity';
import _ from 'lodash';
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
  }),
  [replaceActivity]: (state, data) => {
    console.log('oldActivities', state.activities);
    const newActivities = _.unionBy([data], state.activities, 'id');
    console.log('newActivities', newActivities);
    return {
      ...state,
      activities: newActivities
    };
  }
};
