import { createReducer } from 'redux-act';

import {
  performCreatingUser,
  createUserSuccess,
  createUserFailure,
  performEmailVerification,
  emailVerificationSuccess,
  toggleEmailVerifiedFlag
} from './actions';

const initialState = {
  isCreatingUser: false,
  isVerifyingEmail: false,
  user: null,
  emailVerfiedSuccessfully: false
};

const reducer = {
  [performCreatingUser]: state => ({
    ...state,
    isCreatingUser: true
  }),
  [createUserSuccess]: (state, user) => ({
    ...state,
    isCreatingUser: false,
    user
  }),
  [createUserFailure]: state => ({
    ...state,
    isCreatingUser: false
  }),
  [performEmailVerification]: state => ({
    ...state,
    isVerifyingEmail: true,
  }),
  [emailVerificationSuccess]: state => ({
    ...state,
    isVerifyingEmail: false,
    emailVerfiedSuccessfully: true
  }),
  [toggleEmailVerifiedFlag]: state => ({
    ...state,
    emailVerfiedSuccessfully: false
  })
};

export default createReducer(reducer, initialState);
