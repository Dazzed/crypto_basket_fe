import {
  startChangingPassword,
  confirmChangingPassword,
  changePasswordSuccess,
  changePasswordError
} from '../actions/changePassword';

export const changePasswordReducer = {
  [startChangingPassword]: state => ({
    ...state,
    changingPassword: true
  }),
  [confirmChangingPassword]: state => ({
    ...state,
    isChangingPassword: true
  }),
  [changePasswordSuccess]: state => ({
    ...state,
    changingPassword: false,
    isChangingPassword: false
  }),
  [changePasswordError]: state => ({
    ...state,
    isChangingPassword: false
  })
};
