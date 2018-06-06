import {
  showSaleUnsuccessfulModal,
  hideSaleUnsuccessfulModal,
  salePerformEstimatingTrade,
  saleEstimateTradeSuccess,
  saleEstimateTradeError,
  hideConfirmSaleModal,
  salePerformInitiatingTrade,
  saleInitiateTradeSuccess,
  saleInitiateTradeError,
  saleCloseTradeSuccessModal,
  saleSetFromAssetType,
  saleSetToAssetType
} from '../actions/sellActions';

export const sellReducer = {
  [showSaleUnsuccessfulModal]: (state, saleUnsuccessfulModalContent) => ({
    ...state,
    saleUnsuccessfulModalOpen: true,
    saleUnsuccessfulModalContent
  }),
  [hideSaleUnsuccessfulModal]: state => ({
    ...state,
    saleUnsuccessfulModalOpen: false,
    saleUnsuccessfulModalContent: null
  }),
  [salePerformEstimatingTrade]: state => ({
    ...state,
    saleEstimateTradeResult: null,
    saleIsEstimatingTrade: true
  }),
  [saleEstimateTradeSuccess]: (state, saleEstimateTradeResult) => ({
    ...state,
    saleEstimateTradeResult,
    saleIsEstimatingTrade: false,
    isConfirmSaleModalOpen: true
  }),
  [saleEstimateTradeError]: state => ({
    ...state,
    saleIsEstimatingTrade: false
  }),
  [salePerformInitiatingTrade]: state => ({
    ...state,
    saleIsInitiatingTrade: true
  }),
  [saleInitiateTradeSuccess]: state => ({
    ...state,
    saleIsInitiatingTrade: false,
    isConfirmSaleModalOpen: false,
    saleIsTradeSuccessModalOpen: true
  }),
  [saleInitiateTradeError]: state => ({
    ...state,
    saleIsInitiatingTrade: false
  }),
  [hideConfirmSaleModal]: state => ({
    ...state,
    isConfirmSaleModalOpen: false,
    saleEstimateTradeResult: null,
  }),
  [saleCloseTradeSuccessModal]: state => ({
    ...state,
    saleIsTradeSuccessModalOpen: false
  }),
  [saleSetFromAssetType]: (state, ticker) => ({
    ...state,
    saleFromAssetType: ticker
  }),
  [saleSetToAssetType]: (state, ticker) => ({
    ...state,
    saleToAssetType: ticker
  })
};
