/* eslint-disable consistent-return */
import { put, fork, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { storeAuthDetails } from 'helpers/localStorage';

import {
  authSucess
} from 'containers/App/actions';

import {
  loginFailed,
  loginRequest,
  loginSuccess,
  loginTFANeeded,
  TFAFailed
} from './actions';

export default function* main() {
  yield fork(loginFormWatcher);
}

function* loginFormWatcher() {
  yield takeLatest(loginRequest, function* handler({ payload }) {
    const {
      credentials,
      toastErrorCallBack,
      tfaRequired,
      twoFactorToken,
    } = payload;
    try {
      if (tfaRequired) {
        const requestURL = '/api/users/verifyTwoFactor';
        const params = {
          method: 'POST',
          body: JSON.stringify({ twoFactorToken, otp: credentials.otp, type: 'login' })
        };
        const tfaResponse = yield call(request, { name: requestURL }, params);
        const { userId, id: access_token } = tfaResponse.accessToken;
        // window.access_token = access_token;
        storeAuthDetails({ userId, access_token });
        yield put(authSucess(tfaResponse.user));
        yield put(loginSuccess());
      } else {
        const requestURL = '/api/users/login';
        const params = {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email.toLowerCase(),
            password: credentials.password
          })
        };
        const loginResponse = yield call(request, { name: requestURL }, params);
        if (loginResponse.twoFactorRequired) {
          const { twoFactorToken: tfaTokenFromResponse } = loginResponse.user;
          yield put(loginTFANeeded(tfaTokenFromResponse));
        } else {
          const { userId, id: access_token } = loginResponse;
          // window.access_token = access_token;
          storeAuthDetails({ userId, access_token });
          yield put(authSucess(loginResponse.user));
          yield put(loginSuccess());
        }
      }
    } catch ({ error }) {
      if (!tfaRequired) {
        yield put(loginFailed());
      } else {
        yield put(TFAFailed(twoFactorToken));
      }
      if (toastErrorCallBack) {
        if (tfaRequired) {
          toastErrorCallBack('Invalid OTP.');
        } else {
          toastErrorCallBack(error ? error.message : 'Invalid credentials.');
        }
      }
    }
  });
}
