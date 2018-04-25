import { put, take, fork, call, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  performCreatingUser,
  createUserSuccess,
  createUserFailure
} from './actions';

export default function* main() {
  yield fork(createUserWatcher);
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
      console.log(30, error)
      if (error && error.message) {
        console.log(32, error.message)
        if (error.message.includes('Email already exists')) {
          yield put(stopSubmit('user_register', { email: `${payload.user.email} is already in use` }));
        }
      }
      yield put(createUserFailure(error));
    }
  });
}
