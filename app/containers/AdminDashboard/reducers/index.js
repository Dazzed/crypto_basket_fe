import { createReducer } from 'redux-act';

import { commonReducer } from './common';
import { twoFactorAuthReducer } from './twoFactorAuth';
import { userReducer } from './user';
import { createAdminReducer } from './createAdmin';

const initialState = {
  // users
  creatingUser: false,
  isCreatingUser: false,
  users: null,
  usersFilter: { order: "email ASC" },
  usersVerification: "all",
  usersOrder: "email ASC",
  usersSearch: "",
  fetchingUsers: false,
  editingUser: null,
  isEditingUser: false,
  // tfa
  initiatingTfaForAdmin: false,
  isInitiatingTfaForAdmin: false,
  isOTPModalOpen: false,
  qrCode: null,
  manualCode: null,
  // admins
  creatingAdmin: false,
  isCreatingAdmin: false
};

const reducer = {
  ...commonReducer,
  ...twoFactorAuthReducer,
  ...userReducer,
  ...createAdminReducer
};

export default createReducer(reducer, initialState);
