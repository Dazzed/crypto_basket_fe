import {
  showPurchaseUnsuccessfulModal,
  hidePurchaseUnsuccessfulModal,
  performEstimatingTrade,
  estimateTradeSuccess,
  estimateTradeError,
  hideConfirmPurchaseModal,
  performInitiatingTrade,
  initiateTradeSuccess,
  initiateTradeError,
  closeTradeSuccessModal,
  setFromAssetType,
  setToAssetType
} from '../actions/buyActions';

export const buyReducer = {
  [showPurchaseUnsuccessfulModal]: (state, purchaseUnsuccessfulModalContent) => ({
    ...state,
    purchaseUnsuccessfulModalOpen: true,
    purchaseUnsuccessfulModalContent
  }),
  [hidePurchaseUnsuccessfulModal]: state => ({
    ...state,
    purchaseUnsuccessfulModalOpen: false,
    purchaseUnsuccessfulModalContent: null
  }),
  [performEstimatingTrade]: state => ({
    ...state,
    estimateTradeResult: null,
    isEstimatingTrade: true
  }),
  [estimateTradeSuccess]: (state, estimateTradeResult) => ({
    ...state,
    estimateTradeResult,
    isEstimatingTrade: false,
    isConfirmPurchaseModalOpen: true
  }),
  [estimateTradeError]: state => ({
    ...state,
    isEstimatingTrade: false
  }),
  [performInitiatingTrade]: state => ({
    ...state,
    isInitiatingTrade: true
  }),
  [initiateTradeSuccess]: state => ({
    ...state,
    isInitiatingTrade: false,
    isConfirmPurchaseModalOpen: false,
    isTradeSuccessModalOpen: true
  }),
  [initiateTradeError]: state => ({
    ...state,
    isInitiatingTrade: false
  }),
  [hideConfirmPurchaseModal]: state => ({
    ...state,
    isConfirmPurchaseModalOpen: false,
    estimateTradeResult: null,
  }),
  [closeTradeSuccessModal]: state => ({
    ...state,
    isTradeSuccessModalOpen: false
  }),
  [setFromAssetType]: (state, ticker) => ({
    ...state,
    fromAssetType: ticker
  }),
  [setToAssetType]: (state, ticker) => ({
    ...state,
    toAssetType: ticker
  })
};
