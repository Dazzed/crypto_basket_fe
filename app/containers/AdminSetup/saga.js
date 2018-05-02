import { put, fork, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { stopSubmit } from 'redux-form';

import request from 'helpers/request';
import { storeAuthDetails } from 'helpers/localStorage';

import {
  authSucess
} from 'containers/App/actions';

import {
  initiateOnboarding,
  initiateOnboardingSuccess,
  initiateOnboardingError,
  completeOnboarding,
  completeOnboardingSuccess,
  completeOnboardingError,
} from './actions';

export default function* main() {
  yield fork(initiateOnboardingWatcher);
  yield fork(completeOnboardingWatcher);
}

function* initiateOnboardingWatcher() {
  yield takeLatest(initiateOnboarding, function* handler({ payload: verificationToken }) {
    try {
      const requestURL = '/api/users/initiateAdminOnboarding';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          verificationToken
        })
      };
      const { currentUser, qrCode, manualCode } = yield call(request, { name: requestURL }, params);
      yield put(initiateOnboardingSuccess(currentUser, qrCode, manualCode, verificationToken));
    } catch (error) {
      yield put(initiateOnboardingError(error));
      window.location = '/';
    }
  });
}

function* completeOnboardingWatcher() {
  yield takeLatest(completeOnboarding, function* handler({ payload }) {
    try {
      const {
        verificationToken,
        username,
        password,
        otp
      } = payload;
      const requestURL = '/api/users/completeAdminOnboarding';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          verificationToken,
          username,
          password,
          otp
        })
      };
      const result = yield call(request, { name: requestURL }, params);
      const { userId, id: access_token } = result;
      storeAuthDetails({ userId, access_token });
      yield put(completeOnboardingSuccess());
      /* eslint-disable prefer-template */
      window.location.href = window.location.origin + '/user_login';
    } catch (error) {
      console.log(error);
      if (error.valid === false) {
        window.location = '/';
      } else if (error.validationError) {
        const {
          field,
          message
        } = error;
        yield put(stopSubmit('admin_onboarding', { [field]: message }));
      } else {
        window.location = '/';
      }
      yield put(completeOnboardingError(error));
    }
  });
}
