import { createReducer } from 'redux-act';

import { commonReducer } from './common';
import { twoFactorAuthReducer } from './twoFactorAuth';
import { userReducer } from './user';
import { assetsReducer } from './asset';
import { activitiesReducer } from './activity';
import { createAdminReducer } from './createAdmin';

const initialState = {
  // users
  creatingUser: false,
  isCreatingUser: false,
  users: [],
  usersFilter: { order: 'email ASC' },
  usersVerification: 'all',
  usersOrder: 'email ASC',
  usersSearch: '',
  usersPage: 1,
  fetchingUsers: false,
  editingUser: {},
  isEditingUser: false,
  // tfa
  initiatingTfaForAdmin: false,
  isInitiatingTfaForAdmin: false,
  isOTPModalOpen: false,
  qrCode: null,
  manualCode: null,
  // admins
  creatingAdmin: false,
  isCreatingAdmin: false,
  // assets
  assets: [],
  fetchingAssets: false,
  editingAsset: {},
  // activities
  activities: [],
  isFetchingActivities: true,
  errorFetchingActivities: false,
  totalActivitiesCount: 0,
};

const reducer = {
  ...commonReducer,
  ...twoFactorAuthReducer,
  ...assetsReducer,
  ...userReducer,
  ...createAdminReducer,
  ...activitiesReducer
};

export default createReducer(reducer, initialState);
