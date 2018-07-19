import {
  confirmWithdrawal,
  cancelWithdrawal,
  submitWithdrawalSuccess
} from '../actions/withdrawActions';

export const withdrawReducer = {
  [confirmWithdrawal]: (state, data) => ({
      ...state,
      isConfirmWithdrawalModalOpen: true,
      withdrawalInfo: data 
  }),
  [cancelWithdrawal]: state => ({
    ...state,
    isConfirmWithdrawalModalOpen: false,
    withdrawalInfo: {}
  }),
  [submitWithdrawalSuccess]: state => ({
    ...state,
    isConfirmWithdrawalModalOpen: false,
    withdrawalInfo: {},
    withdrawalSuccessModalOpen: true
  }),
  [closeWithdrawalSuccessModal]: state => ({
    ...state,
    withdrawalSuccessModalOpen: false
  })
};
