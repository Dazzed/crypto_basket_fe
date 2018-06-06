import { createAction } from 'redux-act';

export const PREFIX = 'APP_USER_DASHBOARD_SELL';

export const saleSetFromAssetType = createAction(
  `${PREFIX}_SET_FROM_ASSET_TYPE`,
  ticker => ticker
);

export const saleSetToAssetType = createAction(
  `${PREFIX}_SET_TO_ASSET_TYPE`,
  ticker => ticker
);

export const showSaleUnsuccessfulModal = createAction(
  `${PREFIX}_SHOW_SU_MODAL`,
  content => content
);

export const hideSaleUnsuccessfulModal = createAction(
  `${PREFIX}_HIDE_SU_MODAL`
);

export const salePerformEstimatingTrade = createAction(
  `${PREFIX}_PERFORM_ESTIMATING_TRADE`,
  (fromAssetId, toAssetId, fromAssetAmount, toAssetAmount, tradeType, successCallback, errorCallback, callback) => ({
    fromAssetId,
    toAssetId,
    fromAssetAmount,
    toAssetAmount,
    tradeType,
    successCallback,
    errorCallback,
    callback
  })
);

export const saleEstimateTradeSuccess = createAction(
  `${PREFIX}_ESTIMATE_TRADE_SUCCESS`,
  data => data
);

export const saleEstimateTradeError = createAction(
  `${PREFIX}_ESTIMATE_TRADE_ERROR`
);

export const hideConfirmSaleModal = createAction(
  `${PREFIX}_HIDE_CONFIRM_SALE_MODAL`
);

export const salePerformInitiatingTrade = createAction(
  `${PREFIX}_PERFORM_INITIATING_TRADE`,
  errorCallback => ({
    errorCallback
  })
);

export const saleInitiateTradeSuccess = createAction(
  `${PREFIX}_INITIATE_TRADE_SUCCESS`,
  data => data
);

export const saleInitiateTradeError = createAction(
  `${PREFIX}_INITIATE_TRADE_ERROR`
);

export const saleCloseTradeSuccessModal = createAction(
  `${PREFIX}_CLOSE_TRADE_SUCCESS_MODAL`
);
