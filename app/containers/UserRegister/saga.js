import { put, take, fork, call, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  performCreatingUser,
  createUserSuccess,
  createUserFailure,
  performEmailVerification,
  emailVerificationSuccess
} from './actions';

export default function* main() {
  yield fork(createUserWatcher);
  yield fork(emailVerificationWatcher);
}

function* createUserWatcher() {
  yield takeLatest(performCreatingUser, function* handler({ payload }) {
    try {
      const requestURL = '/api/users';
      const params = {
        method: 'POST',
        body: JSON.stringify(payload.user)
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(createUserSuccess(result));
      if (payload.callback) {
        return payload.callback();
      }
    } catch ({ error }) {
      if (error && error.message) {
        if (error.message.includes('Email already exists')) {
          yield put(stopSubmit('user_register', { email: `${payload.user.email} is already in use` }));
        }
      }
      yield put(createUserFailure(error));
    }
  });
}

function* emailVerificationWatcher() {
  yield takeLatest(performEmailVerification, function* handler({ payload: verificationToken }) {
    try {
      const requestURL = '/api/users/verifyEmail';
      const params = {
        method: 'POST',
        body: JSON.stringify({ verificationToken })
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(emailVerificationSuccess(result));
    } catch (error) {
      window.location = '/';
    }
  });
}
