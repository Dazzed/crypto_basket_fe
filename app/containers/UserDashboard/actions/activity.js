import { createAction } from 'redux-act';

export const PREFIX = 'APP_ADMIN_DASHBOARD';
// *****************************************************************************
// Actions related to fetching data from transfers api (Deposit/Withdrawal Page)
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
// ********************************************************************************
// End Actions related to fetching data from transfers api (Deposit/Withdrawal Page)


// Actions related to fetching data from trade api (Purchase/Sale)
// ***************************************************************
export const fetchTradeData = createAction(
  `${PREFIX}_FETCH_TRADE_DATA`,
  (filter, url) => ({ filter, url })
);
export const fetchTradeDataSuccess = createAction(
  `${PREFIX}_FETCH_TRADE_DATA_SUCCESS`,
  data => data
);
export const fetchTradeDataError = createAction(
  `${PREFIX}_FETCH_TRADE_DATA_ERROR`
);
// ***************************************************************
// End Actions related to fetching data from trade api (Purchase/Sale)
