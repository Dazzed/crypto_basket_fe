import {
  cancelOperation,
} from '../actions/common';

export const commonReducer = {
  [cancelOperation]: state => ({
    ...state,
    creatingUser: false,
    editingUser: null,
    initiatingTfaForAdmin: false,
    isOTPModalOpen: false,
    creatingAdmin: false,
    isCreatingAdmin: false
  }),
};
