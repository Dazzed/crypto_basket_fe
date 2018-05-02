import { createReducer } from 'redux-act';

import {
  loginTFAEnableSuccess,
  loginTFADisableSuccess,
  withdrawalTFAEnableSuccess,
  withdrawalTFADisableSuccess
} from 'containers/UserDashboard/actions/twoFactorAuthActions';

import {
  tfaAdminEnableSuccess
} from 'containers/AdminDashboard/actions/twoFactorAuth';

import {
  patchUserSuccess
} from 'containers/UserDashboard/actions/common';

import {
  authSucess,
  authFailure,
  logOutRequest,
  logOutSuccess,
  logOutFailure,
} from './actions';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isLoggingOut: false
};

const reducer = {
  [authFailure]: state => ({
    ...state,
    isAuthenticating: false,
    isAuthenticated: false
  }),
  [authSucess]: (state, currentUser) => ({
    ...state,
    isAuthenticating: false,
    isAuthenticated: true,
    currentUser
  }),
  [logOutRequest]: state => ({
    ...state,
    isLoggingOut: true
  }),
  [logOutSuccess]: state => ({
    ...state,
    currentUser: null,
    isAuthenticated: false,
    isLoggingOut: false
  }),
  [logOutFailure]: state => ({
    ...state,
    isLoggingOut: false
  }),
  // TFA actions
  [loginTFAEnableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorLoginEnabled: true
    }
  }),
  [loginTFADisableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorLoginEnabled: false
    }
  }),
  [withdrawalTFAEnableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorWithdrawalEnabled: true
    }
  }),
  [withdrawalTFADisableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorWithdrawalEnabled: false
    }
  }),
  [tfaAdminEnableSuccess]: state => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      twoFactorCreateAdminEnabled: true
    }
  }),
  [patchUserSuccess]: (state, updatedUser) => ({
    ...state,
    currentUser: {
      ...state.currentUser,
      ...updatedUser
    }
  })
};

export default createReducer(reducer, initialState);
