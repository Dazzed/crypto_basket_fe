import {
  cancelOperation,
  performPatchingUser,
  patchUserSuccess,
  patchUserError,
  fetchAllAssets,
  fetchAllAssetsSuccess,
  fetchAllAssetsError,
  openDepositModal,
  closeDepositModal
} from '../actions/common';

export const commonReducer = {
  [cancelOperation]: state => ({
    ...state,
    enablingTFALogin: false,
    enablingTFAWithdrawal: false,
    disablingTFALogin: false,
    disablingTFAWithdrawal: false,
    isOTPModalOpen: false,
    changingPassword: false
  }),
  [performPatchingUser]: state => ({
    ...state,
    isPatchingUser: true
  }),
  [patchUserSuccess]: state => ({
    ...state,
    isPatchingUser: false
  }),
  [patchUserError]: state => ({
    ...state,
    isPatchingUser: false
  }),
  [fetchAllAssets]: state => ({
    ...state,
    isFetchingAssets: true,
    errorFetchingAllAssets: false
  }),
  [fetchAllAssetsSuccess]: (state, allAssets) => ({
    ...state,
    allAssets,
    isFetchingAssets: false
  }),
  [fetchAllAssetsError]: state => ({
    ...state,
    isFetchingAssets: false,
    errorFetchingAllAssets: true
  }),
  [openDepositModal]: (state, depositingCurrency) => ({
    ...state,
    depositingCurrency
  }),
  [closeDepositModal]: state => ({
    ...state,
    depositingCurrency: null
  })
};
