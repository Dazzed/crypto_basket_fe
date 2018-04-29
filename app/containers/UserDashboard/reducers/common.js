import {
  cancelOperation,
  performPatchingUser,
  patchUserSuccess,
  patchUserError
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
  })
};
