import { createAction } from 'redux-act';

export const PREFIX = 'APP_USER_DASHBOARD_WITHDRAW';

export const confirmWithdrawal = createAction(
  `${PREFIX}_CONFIRM_WITHDRAWAL`, 
  data => data
);

export const cancelWithdrawal = createAction(
  `${PREFIX}_CANCEL_WITHDRAWAL`
);


export const submitWithdrawal = createAction(
  `${PREFIX}_SUBMIT_WITHDRAWAL`, (data, showError) => ({ data, showError })
);


export const submitWithdrawalSuccess = createAction(
  `${PREFIX}_SUCCESS_WITHDRAWAL`
);

export const cancelPendingWithdrawal = createAction(
  `${PREFIX}_CANCEL_PENDING_WITHDRAWAL`, (id, cb) => ({id, cb})
);
// export const setToAssetType = createAction(
//   `${PREFIX}_SET_TO_ASSET_TYPE`,
//   ticker => ticker
// );

// export const showPurchaseUnsuccessfulModal = createAction(
//   `${PREFIX}_SHOW_PU_MODAL`,
//   content => content
// );

// export const hidePurchaseUnsuccessfulModal = createAction(
//   `${PREFIX}_HIDE_PU_MODAL`
// );

// export const performEstimatingTrade = createAction(
//   `${PREFIX}_PERFORM_ESTIMATING_TRADE`,
//   (fromAssetId, toAssetId, fromAssetAmount, toAssetAmount, tradeType, successCallback, errorCallback, callback) => ({
//     fromAssetId,
//     toAssetId,
//     fromAssetAmount,
//     toAssetAmount,
//     tradeType,
//     successCallback,
//     errorCallback,
//     callback
//   })
// );

// export const estimateTradeSuccess = createAction(
//   `${PREFIX}_ESTIMATE_TRADE_SUCCESS`,
//   data => data
// );

// export const estimateTradeError = createAction(
//   `${PREFIX}_ESTIMATE_TRADE_ERROR`
// );

// export const hideConfirmPurchaseModal = createAction(
//   `${PREFIX}_HIDE_CONFIRM_PURCHASE_MODAL`
// );

// export const performInitiatingTrade = createAction(
//   `${PREFIX}_PERFORM_INITIATING_TRADE`,
//   errorCallback => ({
//     errorCallback
//   })
// );

// export const initiateTradeSuccess = createAction(
//   `${PREFIX}_INITIATE_TRADE_SUCCESS`,
//   data => data
// );

// export const initiateTradeError = createAction(
//   `${PREFIX}_INITIATE_TRADE_ERROR`
// );

// export const closeTradeSuccessModal = createAction(
//   `${PREFIX}_CLOSE_TRADE_SUCCESS_MODAL`
// );
