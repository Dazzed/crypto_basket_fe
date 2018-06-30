import { put, fork, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { getAuthDetails, removeAuthDetails } from 'helpers/localStorage';
// import SuperCompare from 'helpers/superCompare';

import {
  logOutRequest,
  logOutSuccess,
  logOutFailure,
  submitFeedback,
  submitFeedbackSuccess,
  submitFeedbackError,
  authSucess,
  authFailure,
  verifyAuth
} from './actions';

export default function* main() {
  yield fork(getCurrentUserWatcher);
  yield fork(logOutWatcher);
  yield fork(feedbackWatcher);
}

export function* getCurrentUser() {
  try {
    const authDetails = getAuthDetails();
    if (Object.keys(authDetails).length) {
      const filter = JSON.stringify({
        custom_include: ['all_details'],
        include: [{
          roleMapping: 'role',
        }, 'documents']
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

function* feedbackWatcher() {
  yield takeLatest(submitFeedback, function* handler({ payload }) {
    try {
      const requestURL = '/api/users/submit_feedback';
      const params = {
        method: 'POST',
        body: JSON.stringify(payload)
      };
      yield call(request, { name: requestURL }, params);
      yield put(submitFeedbackSuccess());
      alert('Thank you, you will receive an email shortly to your Melotic email address answering your query');
    } catch (error) {
      yield put(submitFeedbackError());
    }
  });
}
