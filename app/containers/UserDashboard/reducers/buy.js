import {
  showPurchaseUnsuccessfulModal,
  hidePurchaseUnsuccessfulModal,
  performEstimatingTrade,
  estimateTradeSuccess,
  estimateTradeError,
  hideConfirmPurchaseModal,
  performInititatingTrade,
  initiateTradeSuccess,
  initiateTradeError,
  closeTradeSuccessModal
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
  [performInititatingTrade]: state => ({
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
  })
};
