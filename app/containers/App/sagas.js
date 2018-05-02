import { put, fork, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { getAuthDetails, removeAuthDetails } from 'helpers/localStorage';
// import SuperCompare from 'helpers/superCompare';

import {
  logOutRequest,
  logOutSuccess,
  logOutFailure,
} from './actions';

export default function* main() {
  yield fork(logOutWatcher);
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
