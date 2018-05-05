import { put, take, fork, call, cancel, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  resetUserPassword,
  setUserPassword,
  resetUsername
} from './actions';

export default function* main() {
  yield fork(resetPasswordWater);
  yield fork(setPasswordWater);
  yield fork(resetUsernameWater);
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

function* resetUsernameWater(){
  yield takeLatest(resetUsername, function* handler({ payload: email }){
    try{
      const requestURL = `/api/users/forgotUsername`;
      const params = {
        method: 'POST',
        body: JSON.stringify({
          email: email.email.email
        })
      };
      const result = yield call(request, { name: requestURL }, params);
      console.log('username reset result', result);
    }catch(e){
      console.log('error', e);
    }
  })
}


function* setPasswordWater(){
  yield takeLatest(setUserPassword, function* handler({ payload: { content, token }}){
    try{
      console.log('content', content, 'token', token);
      const requestURL = `/api/users/reset-password`;
      if(content.newPassword!==content.confirmPassword){
        throw("Passwords do not match");
      }
      const params = {
        method: 'POST',
        headers: {'Authorization': token},
        body: JSON.stringify({
          newPassword: content.newPassword
        })
      };
      const result = yield call(request, { name: requestURL }, params);
      console.log('password reset result', result);
    }catch(e){
      console.log('error', e);
    }
  })
}