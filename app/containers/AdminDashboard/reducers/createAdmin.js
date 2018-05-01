import {
  startCreatingAdmin,
  performCreatingAdmin,
  createAdminSuccess,
  createAdminError
} from '../actions/createAdmin';

export const createAdminReducer = {
  [startCreatingAdmin]: state => ({
    ...state,
    creatingAdmin: true
  }),
  [performCreatingAdmin]: state => ({
    ...state,
    isCreatingAdmin: true
  }),
  [createAdminSuccess]: state => ({
    ...state,
    creatingAdmin: false,
    isCreatingAdmin: false
  }),
  [createAdminError]: state => ({
    ...state,
    isCreatingAdmin: false
  })
};
