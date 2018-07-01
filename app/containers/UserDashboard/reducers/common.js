import {
  cancelOperation,
  performPatchingUser,
  patchUserSuccess,
  patchUserError,
  fetchAllAssets,
  fetchAllAssetsSuccess,
  fetchAllAssetsError,
  openDepositModal,
  closeDepositModal,
  performUploadingIdentity,
  uploadIdentitySuccess,
  uploadIdentityError,
  performUploadingProof,
  uploadProofSuccess,
  uploadProofError
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
  }),
  [performUploadingIdentity]: state => ({
    ...state,
    isUploadingIdentity: true
  }),
  [uploadIdentitySuccess]: state => ({
    ...state,
    isUploadingIdentity: false,
  }),
  [uploadIdentityError]: state => ({
    ...state,
    isUploadingIdentity: false,
  }),
  [performUploadingProof]: state => ({
    ...state,
    isUploadingProof: true
  }),
  [uploadProofSuccess]: state => ({
    ...state,
    isUploadingProof: false,
  }),
  [uploadProofError]: state => ({
    ...state,
    isUploadingProof: false
  }),
};
