import { put, take, fork, call, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  startEnablingTFAAdmin,
  performEnablingTFAAdmin,
  tfaAdminEnableSuccess,
  tfaAdminEnableError,
  updateQrCodeAndManual
} from './actions/twoFactorAuth';

import {
  performCreatingAdmin,
  createAdminSuccess,
  createAdminError
} from './actions/createAdmin';

export default function* main() {
  yield fork(tfaAdminEnableWatcherInitial);
  yield fork(tfaAdminEnableWatcherFinal);
  yield fork(createAdminWatcher);
}

function* tfaAdminEnableWatcherInitial() {
  yield takeLatest(startEnablingTFAAdmin, function* handler({ payload: twoFactorToken }) {
    try {
      const requestURL = `/api/users/initiateTwoFactor/${twoFactorToken}`;
      const params = {
        method: 'GET'
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(updateQrCodeAndManual(result));
    } catch (error) {
      yield put(tfaAdminEnableError(error));
    }
  });
}

function* tfaAdminEnableWatcherFinal() {
  yield takeLatest(performEnablingTFAAdmin, function* handler({ payload }) {
    try {
      const requestURL = '/api/users/verifyTwoFactor';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          type: 'creatingAdmin'
        })
      };
      yield call(request, { name: requestURL }, params);
      yield put(tfaAdminEnableSuccess());
    } catch (error) {
      yield put(tfaAdminEnableError(error));
      yield put(stopSubmit('otp_form', { otp: 'Invalid OTP' }));
    }
  });
}

function* createAdminWatcher() {
  yield takeLatest(performCreatingAdmin, function* handler({ payload }) {
    try {
      const requestURL = '/api/users';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...payload.admin,
          isCreatingAdmin: true
        })
      };
      const createdAdmin = yield call(request, { name: requestURL }, params);
      yield put(createAdminSuccess(createdAdmin));
      payload.toastSuccessCallBack('Invite sent to the email address successfully!');
    } catch ({error}) {
      yield put(createAdminError(error));
      if (error && error.message) {
        if (error.message.includes('Email already exists')) {
          yield put(stopSubmit('create_admin', { email: `${payload.admin.email} is already in use` }));
        } else if (error.message.includes('Invalid OTP')) {
          yield put(stopSubmit('create_admin', { otp: error.message }));
        }
      } else {
        payload.toastErrorCallBack('There was an error. Please Try again later');
      }
    }
  });
}
