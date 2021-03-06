import { createReducer } from 'redux-act';

import { commonReducer } from './common';
import { twoFactorAuthReducer } from './twoFactorAuthReducer';
import { changePasswordReducer } from './changePasswordReducer';
import { buyReducer } from './buy';
import { sellReducer } from './sell';
import { activitiesReducer } from './activity';
import { withdrawReducer } from './withdraw';

const initialState = {
  enablingTFALogin: false,
  enablingTFAWithdrawal: false,
  isEnablingTFALogin: false,
  isEnablingTFAWithdrawal: false,
  disablingTFALogin: false,
  disablingTFAWithdrawal: false,
  isDisablingTFALogin: false,
  isDisablingTFAWithdrawal: false,
  qrCode: null,
  manualCode: null,
  isOTPModalOpen: false,
  // activeTfaToggleKey ~> value is set if enabling one flag to active when another is also active
  activeTfaToggleKey: null,
  // change password keys
  changingPassword: false,
  isChangingPassword: false,
  // user keys
  isPatchingUser: false,
  isFetchingAssets: false,
  allAssets: [],
  errorFetchingAllAssets: false,
  isUploadingIdentity: false,
  isUploadingProof: false,
  // buy actions
  purchaseUnsuccessfulModalOpen: false,
  purchaseUnsuccessfulModalContent: null,
  isEstimatingTrade: false,
  estimateTradeResult: null,
  isConfirmPurchaseModalOpen: false,
  isInitiatingTrade: false,
  isTradeSuccessModalOpen: false,
  // sell actions
  saleUnsuccessfulModalOpen: false,
  saleUnsuccessfulModalContent: null,
  saleIsEstimatingTrade: false,
  saleEstimateTradeResult: null,
  isConfirmSaleModalOpen: false,
  saleIsInitiatingTrade: false,
  saleIsTradeSuccessModalOpen: false,
  // A property that indicates the currency the user is depositing and also serves as a flag whether the deposit Modal should be open or not
  depositingCurrency: null,
  // activity related properties
    // 1.) deposit / withdrawal
  activities: [],
  isFetchingActivities: true,
  errorFetchingActivities: false,
  totalActivitiesCount: 0,
    // 2.) buy / sell
  tradeData: [],
  isFetchingTradeData: true,
  errorFetchingTradeData: false,
  totalTradeDataCount: 0,
  // Buy properties
  fromAssetType: 'eth',
  toAssetType: 'btc',
  // Sell properties
  saleFromAssetType: 'eth',
  saleToAssetType: 'btc',
  // withdrawal properties
  isConfirmWithdrawalModalOpen: false,
  withdrawalUnsuccessfulModalOpen: false,
  withdrawalSuccessModalOpen: false,
  withdrawalInfo: {}
};

const reducer = {
  ...commonReducer,
  ...twoFactorAuthReducer,
  ...changePasswordReducer,
  ...buyReducer,
  ...sellReducer,
  ...activitiesReducer,
  ...withdrawReducer
};

export default createReducer(reducer, initialState);
