/* eslint-disable consistent-return */
import { put, fork, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { storeAuthDetails } from 'helpers/localStorage';

import {
  authSucess
} from 'containers/App/actions';

import {
  getCurrentUser
} from 'containers/App/sagas';

import {
  loginFailed,
  loginRequest,
  loginSuccess,
  loginTFANeeded
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
      twoFactorToken
    } = payload;
    try {
      if(tfaRequired){
        const requestURL = '/api/users/verifyTwoFactor';
        const params = {
          method: 'POST',
          body: JSON.stringify({twoFactorToken: twoFactorToken, otp: parseInt(credentials.otp), type: "login"})
        };
        const tfaResponse = yield call(request, { name: requestURL }, params);
        const { userId, id: access_token } = tfaResponse.accessToken;
        storeAuthDetails({ userId, access_token });
        const currentUser = yield call(getCurrentUser);
        yield put(authSucess(currentUser));
        yield put(loginSuccess());
      }else{
        const requestURL = '/api/users/login';
        const params = {
          method: 'POST',
          body: JSON.stringify(credentials)
        };
        const loginResponse = yield call(request, { name: requestURL }, params);
        if(loginResponse.twoFactorRequired){
          const twoFactorToken = loginResponse.user.twoFactorToken;
          yield put(loginTFANeeded(twoFactorToken));
        }else{
          const { userId, id: access_token } = loginResponse;
          storeAuthDetails({ userId, access_token });
          const currentUser = yield call(getCurrentUser);
          yield put(authSucess(currentUser));
          yield put(loginSuccess());
        }
      }
    } catch ({error}) {
      yield put(loginFailed());
      if (toastErrorCallBack) {
        toastErrorCallBack(error ? error.message : 'Invalid credentials.');
      }
    }
  });
}
