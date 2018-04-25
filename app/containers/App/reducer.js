import { createReducer } from 'redux-act';

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
  isAuthenticating: true,
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
  })
};

export default createReducer(reducer, initialState);
