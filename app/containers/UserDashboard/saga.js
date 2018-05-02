import { put, fork, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  startEnablingTFALogin,
  performEnablingTFALogin,
  loginTFAEnableSuccess,
  loginTFAEnableError,
  loginTFADisableSuccess,
  loginTFADisableError,
  performEnablingTFAWithdrawal,
  withdrawalTFAEnableSuccess,
  withdrawalTFAEnableError,
  withdrawalTFADisableSuccess,
  withdrawalTFADisableError,
  updateQrCodeAndManual,
  startEnablingTFAWithdrawal,
  updateTfaEnabledWithOtp
} from './actions/twoFactorAuthActions';

import {
  confirmChangingPassword,
  changePasswordSuccess,
  changePasswordError
} from './actions/changePassword';

import {
  performPatchingUser,
  patchUserSuccess,
  patchUserError
} from './actions/common';

export default function* main() {
  yield fork(tfaLoginEnableWatcherInitial);
  yield fork(tfaLoginEnableWatcherFinal);

  yield fork(tfaWithdrawalEnableWatcherInitial);
  yield fork(tfaWithdrawalEnableWatcherFinal);

  yield fork(updateFlagWithOTP);
  yield fork(changePasswordWatcher);
  yield fork(patchUserWatcher);
}

function* tfaLoginEnableWatcherInitial() {
  yield takeLatest(startEnablingTFALogin, function* handler({ payload: twoFactorToken }) {
    try {
      const requestURL = `/api/users/initiateTwoFactor/${twoFactorToken}`;
      const params = {
        method: 'GET'
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(updateQrCodeAndManual(result));
    } catch (error) {
      yield put(loginTFAEnableError(error));
    }
  });
}

function* tfaLoginEnableWatcherFinal() {
  yield takeLatest(performEnablingTFALogin, function* handler({ payload }) {
    try {
      const requestURL = '/api/users/verifyTwoFactor';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          type: 'login'
        })
      };
      yield call(request, { name: requestURL }, params);
      yield put(loginTFAEnableSuccess());
    } catch (error) {
      yield put(loginTFAEnableError(error));
      yield put(stopSubmit('otp_form', { otp: 'Invalid OTP' }));
    }
  });
}

function* tfaWithdrawalEnableWatcherInitial() {
  yield takeLatest(startEnablingTFAWithdrawal, function* handler({ payload: twoFactorToken }) {
    try {
      const requestURL = `/api/users/initiateTwoFactor/${twoFactorToken}`;
      const params = {
        method: 'GET'
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(updateQrCodeAndManual(result));
    } catch (error) {
      yield put(withdrawalTFAEnableError(error));
    }
  });
}

function* tfaWithdrawalEnableWatcherFinal() {
  yield takeLatest(performEnablingTFAWithdrawal, function* handler({ payload }) {
    try {
      const requestURL = '/api/users/verifyTwoFactor';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          type: 'withdrawal'
        })
      };
      yield call(request, { name: requestURL }, params);
      yield put(withdrawalTFAEnableSuccess());
    } catch (error) {
      yield put(withdrawalTFAEnableError(error));
      yield put(stopSubmit('otp_form', { otp: 'Invalid OTP' }));
    }
  });
}

function* updateFlagWithOTP() {
  /* eslint-disable no-lonely-if */
  yield takeLatest(updateTfaEnabledWithOtp, function* handler({ payload }) {
    const {
      userId, flagName, value, otp
    } = payload;
    try {
      const requestURL = `/api/users/${userId}`;
      const params = {
        method: 'PATCH',
        body: JSON.stringify({
          [flagName]: value,
          otp
        })
      };
      yield call(request, { name: requestURL }, params);
      // yield put(withdrawalTFAEnableSuccess());
      if (flagName === 'twoFactorLoginEnabled') {
        if (value === true) {
          yield put(loginTFAEnableSuccess());
        } else {
          yield put(loginTFADisableSuccess());
        }
      } else {
        if (value === true) {
          yield put(withdrawalTFAEnableSuccess());
        } else {
          yield put(withdrawalTFADisableSuccess());
        }
      }
    } catch (error) {
      if (flagName === 'twoFactorLoginEnabled') {
        if (value === true) {
          yield put(loginTFAEnableError());
        } else {
          yield put(loginTFADisableError());
        }
      } else {
        if (value === true) {
          yield put(withdrawalTFAEnableError());
        } else {
          yield put(withdrawalTFADisableError());
        }
      }
      yield put(stopSubmit('otp_form', { otp: 'Invalid OTP' }));
    }
  });
}

function* changePasswordWatcher() {
  yield takeLatest(confirmChangingPassword, function* handler({ payload }) {
    try {
      const requestURL = '/api/users/change-password';
      const params = {
        method: 'POST',
        body: JSON.stringify(payload)
      };
      yield call(request, { name: requestURL }, params);
      yield put(changePasswordSuccess());
      payload.toastSuccessCallBack('Password Changed Successfully!');
    } catch (error) {
      yield put(changePasswordError());
      yield put(stopSubmit('change_password', { oldPassword: 'Invalid Old Password' }));
    }
  });
}

function* patchUserWatcher() {
  yield takeLatest(performPatchingUser, function* handler({ payload }) {
    try {
      const {
        user,
        values
      } = payload;
      if (values.dob) {
        values.dob = values.dob.format('YYYY-MM-DD');
      }
      const requestURL = `/api/users/${user.id}`;
      const params = {
        method: 'PATCH',
        body: JSON.stringify(values)
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(patchUserSuccess(result));
      // yield put(destroy('user_verification'));
      payload.toastSuccessCallBack('Your information is updated successfully!');
    } catch (error) {
      yield put(patchUserError());
      // yield put(stopSubmit('change_password', { oldPassword: 'Invalid Old Password' }));
      payload.toastErrorCallBack('There was an error');
    }
  });
}
