import { put, fork, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { getAuthDetails, removeAuthDetails } from 'helpers/localStorage';
// import SuperCompare from 'helpers/superCompare';

import {
  verifyAuth,
  authSucess,
  authFailure,
  logOutRequest,
  logOutSuccess,
  logOutFailure,
} from './actions';

export default function* main() {
  yield fork(getCurrentUserWatcher);
  yield fork(logOutWatcher);
}

export function* getCurrentUser() {
  try {
    const authDetails = getAuthDetails();
    if (Object.keys(authDetails).length) {
      const filter = JSON.stringify({
        include: {
          roleMapping: 'role'
        }
      });
      const requestURL = `/api/users/${authDetails.userId}?filter=${filter}`;
      const params = {
        method: 'GET'
      };
      const currentUser = yield call(request, { name: requestURL }, params);
      yield put(authSucess(currentUser));
    } else {
      yield put(authFailure());
    }
  } catch (error) {
    yield put(authFailure());
  }
}

function* getCurrentUserWatcher() {
  yield takeLatest(verifyAuth, getCurrentUser);
}

function* logOutWatcher() {
  yield takeLatest(logOutRequest, function* handler() {
    try {
      const requestURL = '/api/users/logout';
      const params = {
        method: 'POST'
      };
      yield call(request, { name: requestURL }, params);
      removeAuthDetails();
      yield put(logOutSuccess());
      window.location.pathname = '/';
    } catch (error) {
      yield put(logOutFailure());
    }
  });
}
