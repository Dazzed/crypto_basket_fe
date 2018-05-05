import { put, take, fork, call, cancel, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  startEnablingTFAAdmin,
  performEnablingTFAAdmin,
  tfaAdminEnableSuccess,
  tfaAdminEnableError,
  updateQrCodeAndManual
} from './actions/twoFactorAuth';

import {
  performCreatingAdmin,
  createAdminSuccess,
  createAdminError
} from './actions/createAdmin';


import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError, 
  updateSearch,
  filterVerification,
  swapOrdering, 
  resetUserPassword,
  archiveUser
} from './actions/user';

export default function* main() {
  yield fork(tfaAdminEnableWatcherInitial);
  yield fork(tfaAdminEnableWatcherFinal);
  yield fork(createAdminWatcher);
  yield fork(fetchUsersWatcher);
  yield fork(updateSearchWatcher);
  yield fork(filterVerificationWatcher);
  yield fork(swapOrderWatcher);
  yield fork(resetPasswordWater);
  yield fork(archiveUserWatcher);
}

export const getSearch = state => state.adminDashboard.usersSearch;
export const getFilter = state => state.adminDashboard.usersFilter;

function* resetPasswordWater(){
  yield takeLatest(resetUserPassword, function* handler({ payload: email }){
    try{
      const requestURL = `/api/users/reset`;
      const params = {
        method: 'POST',
        headers: {'Authorization': window.access_token},
        body: JSON.stringify({
          email: email.email
        })
      };
      const result = yield call(request, { name: requestURL }, params);
      console.log('password reset result', result);
    }catch(e){
      yield put(fetchUsersError(e));
    }
  })
}

function* archiveUserWatcher(){
  yield takeLatest(archiveUser, function* handler({ payload: id }){
    try{
      const requestURL = `/api/users/archive/${id}`;
      const params = {
        method: 'POST',
        headers: {'Authorization': window.access_token},
        body: JSON.stringify({
          options:{ email: email }
        })
      };
      const result = yield call(request, { name: requestURL }, params);
      console.log('archive user result', result);
    }catch(e){
      yield put(fetchUsersError(e));
    }
  })
}

function* updateSearchWatcher(){
  yield takeLatest(updateSearch, function* handler({ payload }){
    yield put(fetchUsers());
  });
}

function* filterVerificationWatcher(){
  yield takeLatest(filterVerification, function* handler({ payload }){
    console.log('fetching users');
    yield put(fetchUsers());
  });
}

function* swapOrderWatcher(){
  yield takeLatest(swapOrdering, function* handler({ payload }){
    yield put(fetchUsers());
  });
}

function* fetchUsersWatcher(){
  yield takeLatest(fetchUsers, function* handler({ payload }){
    try{
      const searchQuery = yield select(getSearch);
      const filterQuery = yield select(getFilter);
      const baseRequestURL = `/api/users/`;
      const requestURL = searchQuery ? `/api/users/search/` + searchQuery : baseRequestURL;
      const args = '?' + (filterQuery.where ? `filter[where][verificationStatus]=${filterQuery.where.verificationStatus}&` : "") + (filterQuery.order ? `filter[order]=${filterQuery.order}` : "")
      const params = {
        method: 'GET', 
        headers: {'Authorization': window.access_token}
      };
      const result = yield call(request, { name: requestURL + args }, params);
      yield put(fetchUsersSuccess(result));
    }catch(error){
      yield put(fetchUsersError(error));
    }
  });
}

function* tfaAdminEnableWatcherInitial() {
  yield takeLatest(startEnablingTFAAdmin, function* handler({ payload: twoFactorToken }) {
    try {
      const requestURL = `/api/users/initiateTwoFactor/${twoFactorToken}`;
      const params = {
        method: 'GET'
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(updateQrCodeAndManual(result));
    } catch (error) {
      yield put(tfaAdminEnableError(error));
    }
  });
}

function* tfaAdminEnableWatcherFinal() {
  yield takeLatest(performEnablingTFAAdmin, function* handler({ payload }) {
    try {
      const requestURL = '/api/users/verifyTwoFactor';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          type: 'creatingAdmin'
        })
      };
      yield call(request, { name: requestURL }, params);
      yield put(tfaAdminEnableSuccess());
    } catch (error) {
      yield put(tfaAdminEnableError(error));
      yield put(stopSubmit('otp_form', { otp: 'Invalid OTP' }));
    }
  });
}

function* createAdminWatcher() {
  yield takeLatest(performCreatingAdmin, function* handler({ payload }) {
    try {
      const requestURL = '/api/users';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...payload.admin,
          isCreatingAdmin: true
        })
      };
      const createdAdmin = yield call(request, { name: requestURL }, params);
      yield put(createAdminSuccess(createdAdmin));
      payload.toastSuccessCallBack('Invite sent to the email address successfully!');
    } catch ({error}) {
      yield put(createAdminError(error));
      if (error && error.message) {
        if (error.message.includes('Email already exists')) {
          yield put(stopSubmit('create_admin', { email: `${payload.admin.email} is already in use` }));
        } else if (error.message.includes('Invalid OTP')) {
          yield put(stopSubmit('create_admin', { otp: error.message }));
        }
      } else {
        payload.toastErrorCallBack('There was an error. Please Try again later');
      }
    }
  });
}
