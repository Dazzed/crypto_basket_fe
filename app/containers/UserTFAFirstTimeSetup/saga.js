import { put, fork, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  loginTFAEnableSuccess
} from 'containers/UserDashboard/actions/twoFactorAuthActions';

import {
  startEnablingTFALogin,
  performEnablingTFALogin,
  loginTFAEnableSuccess as thizLoginTFAEnableSuccess,
  loginTFAEnableError,
  updateQrCodeAndManual
} from './actions';

export default function* main() {
  yield fork(tfaLoginEnableWatcherInitial);
  yield fork(tfaLoginEnableWatcherFinal);
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
      yield put(thizLoginTFAEnableSuccess());
      yield put(loginTFAEnableSuccess());
      payload.callback();
    } catch (error) {
      yield put(loginTFAEnableError(error));
      yield put(stopSubmit('otp_form', { otp: 'Invalid OTP' }));
    }
  });
}
