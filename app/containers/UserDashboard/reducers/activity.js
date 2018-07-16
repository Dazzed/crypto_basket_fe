import {
  fetchActivities,
  fetchActivitiesSuccess,
  fetchActivitiesError,
  fetchTradeData,
  fetchTradeDataSuccess,
  fetchTradeDataError,
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
  [fetchTradeData]: state => spreadState(state, {
    totalTradeDataCount: 0,
    errorFetchingTradeData: false,
    tradeData: [],
    isFetchingTradeData: true,
  }),
  [fetchTradeDataSuccess]: (state, { data: tradeData, totalCount }) => spreadState(state, {
    tradeData,
    totalTradeDataCount: totalCount,
    isFetchingTradeData: false
  }),
  [fetchTradeDataError]: state => spreadState(state, {
    errorFetchingTradeData: true,
    isFetchingTradeData: false
  }),
  [replaceActivity]: (state, data) => {
    const newActivities = _.unionBy([data], state.tradeData, 'id');
    return {
      ...state,
      tradeData: newActivities
    };
  }
};
