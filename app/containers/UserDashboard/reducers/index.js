import { createReducer } from 'redux-act';

import { commonReducer } from './common';
import { twoFactorAuthReducer } from './twoFactorAuthReducer';
import { changePasswordReducer } from './changePasswordReducer';
import { buyReducer } from './buy';

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
  // buy actions
  purchaseUnsuccessfulModalOpen: false,
  purchaseUnsuccessfulModalContent: null,
  isEstimatingTrade: false,
  estimateTradeResult: null,
  isConfirmPurchaseModalOpen: false,
  isInitiatingTrade: false,
  isTradeSuccessModalOpen: false
};

const reducer = {
  ...commonReducer,
  ...twoFactorAuthReducer,
  ...changePasswordReducer,
  ...buyReducer
};

export default createReducer(reducer, initialState);
