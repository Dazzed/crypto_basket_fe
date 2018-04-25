import { createReducer } from 'redux-act';

import {
  performCreatingUser,
  createUserSuccess,
  createUserFailure
} from './actions';

const initialState = {
  isCreatingUser: false,
  user: null
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
  })
};

export default createReducer(reducer, initialState);
