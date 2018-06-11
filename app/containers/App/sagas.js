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
  submitFeedbackError
} from './actions';

export default function* main() {
  yield fork(logOutWatcher);
  yield fork(feedbackWatcher);
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
  yield takeLatest(submitFeedback, function* handler({payload}) {
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
