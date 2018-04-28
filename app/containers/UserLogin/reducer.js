import { createReducer } from 'redux-act';

import {
  loginRequest,
  loginSuccess,
  loginFailed
} from './actions';

const initialState = {
  loginFailed: false,
  isLoggingIn: false
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
    isLoggingIn: false
  })
};

export default createReducer(reducer, initialState);
