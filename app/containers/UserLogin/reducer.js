import { createReducer } from 'redux-act';

import {
  loginRequest,
  loginSuccess,
  loginFailed,
  loginTFANeeded,
  TFAFailed
} from './actions';

const initialState = {
  loginFailed: false,
  isLoggingIn: false,
  tfaRequired: false,
  tfaToken: ""
};

const reducer = {
  [loginRequest]: state => ({
    ...state,
    loginFailed: false,
    isLoggingIn: true
  }),
  [loginFailed]: state => ({
    ...state,
    loginFailed: true,
    isLoggingIn: false
  }),
  [loginSuccess]: state => ({
    ...state,
    isLoggingIn: false, 
    tfaRequired: false
  }),
  [loginTFANeeded]: (state, action) => ({
    ...state,
    isLoggingIn: false,
    tfaRequired: true, 
    loginFailed: false,
    tfaToken: action.tfaToken
  }),
  [TFAFailed]: (state, action) => ({
    isLoggingIn: false,
    tfaRequired: true,
    tfaToken: action.tfaToken
  })
};

export default createReducer(reducer, initialState);
