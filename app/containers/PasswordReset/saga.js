import { put, take, fork, call, cancel, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  resetUserPassword,
} from './actions';

export default function* main() {
  yield fork(resetPasswordWater);
}

function* resetPasswordWater(){
  yield takeLatest(resetUserPassword, function* handler({ payload: email }){
    try{
      const requestURL = `/api/users/reset`;
      const params = {
        method: 'POST',
        body: JSON.stringify({
          email: email.email.email
        })
      };
      const result = yield call(request, { name: requestURL }, params);
      console.log('password reset result', result);
    }catch(e){
      console.log('error', e);
    }
  })
}