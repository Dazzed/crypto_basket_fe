import {
  cancelOperation
} from '../actions/common';

export const commonReducer = {
  [cancelOperation]: state => ({
    ...state,
    enablingTFALogin: false,
    enablingTFAWithdrawal: false,
    disablingTFALogin: false,
    disablingTFAWithdrawal: false,
    isOTPModalOpen: false
  })
};
