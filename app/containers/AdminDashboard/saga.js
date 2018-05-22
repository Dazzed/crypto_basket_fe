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
  archiveUser,
  fetchUser,
  fetchUserSuccess,
  updateUser,
  performCreatingUser,
  createUserSuccess,
  createUserError
} from './actions/user';

import {
  fetchAssets,
  fetchAssetsSuccess,
  fetchAssetsError,
  updateAsset,
  fetchAssetSuccess
} from './actions/asset';

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
  yield fork(fetchSingleUserWatcher);
  yield fork(updateUserWatcher);
  yield fork(fetchAssetsWatcher);
  yield fork(updateAssetWatcher);
  yield fork(createUserWatcher);
}

export const getSearch = state => state.adminDashboard.usersSearch;
export const getFilter = state => state.adminDashboard.usersFilter;

function* updateAssetWatcher() {
  yield takeLatest(updateAsset, function* handler({ payload: { data, id } }) {
    try {
      console.log('in asset watcher update');
      const baseRequestURL = `/api/assets/${id}/`;
      const params = {
        method: 'PATCH',
        headers: { 'Authorization': window.access_token },
        body: JSON.stringify(
          data
        )
      };
      const result = yield call(request, { name: baseRequestURL }, params);
      console.log('result', result);
      yield put(fetchAssetSuccess(result));
    } catch (error) {
      console.log('got error', error);
      yield put(fetchAssetsError(error));
    }
  });
}

function* fetchAssetsWatcher() {
  yield takeLatest(fetchAssets, function* handler({ payload }) {
    try {
      const baseRequestURL = `/api/assets?filter=%7B%22custom_include%22%3A%5B%22populateValueAndMinimumPurchase%22%2C%20%22populateCommunityValues%22%2C%20%22populateCommunityQuantity%22%2C%20%22populatePrices%22%5D%7D`;
      const params = {
        method: 'GET',
        headers: { 'Authorization': window.access_token }
      };
      const result = yield call(request, { name: baseRequestURL }, params);
      yield put(fetchAssetsSuccess(result));
    } catch (error) {
      yield put(fetchAssetsError(error));
    }
  });
}

function* updateUserWatcher() {
  yield takeLatest(updateUser, function* handler({ payload: { data, id } }) {
    try {
      console.log('data', data, 'id', id);
      const baseRequestURL = `/api/users/${id}/`;
      const params = {
        method: 'PATCH',
        headers: { 'Authorization': window.access_token },
        body: JSON.stringify(
          data
        )
      };
      const result = yield call(request, { name: baseRequestURL }, params);
      yield put(fetchUserSuccess(result));
    } catch (error) {
      yield put(fetchUsersError(error));
    }
  });
}

function* fetchSingleUserWatcher() {
  yield takeLatest(fetchUser, function* handler({ payload: id }) {
    try {
      const baseRequestURL = `/api/users/${id.id}/?filter[include]=wallets`;
      const params = {
        method: 'GET',
        headers: { 'Authorization': window.access_token }
      };
      const result = yield call(request, { name: baseRequestURL }, params);
      yield put(fetchUserSuccess(result));
    } catch (error) {
      yield put(fetchUsersError(error));
    }
  });
}
function* resetPasswordWater() {
  yield takeLatest(resetUserPassword, function* handler({ payload }) {
    try {
      console.log('payload', payload);
      const requestURL = `/api/users/reset`;
      const params = {
        method: 'POST',
        headers: { 'Authorization': window.access_token },
        body: JSON.stringify({
          email: payload.email
        })
      };
      const result = yield call(request, { name: requestURL }, params);
      payload.toastSuccessCallBack('Password reset email sent.');
      console.log('password reset result', result);
    } catch (e) {
      payload.toastErrorCallBack('Action could not be completed at this time.');
    }
  });
}

function* archiveUserWatcher() {
  yield takeLatest(archiveUser, function* handler({ payload: id }) {
    try {
      console.log('ID', id);
      const requestURL = `/api/users/archive/${id.id}/`;
      const params = {
        method: 'POST',
        headers: { 'Authorization': window.access_token },
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(fetchUserSuccess(result));
    } catch (e) {
      // yield put(fetchUsersError(e));
    }
  })
}

function* updateSearchWatcher() {
  yield takeLatest(updateSearch, function* handler({ payload }) {
    yield put(fetchUsers());
  });
}

function* filterVerificationWatcher() {
  yield takeLatest(filterVerification, function* handler({ payload }) {
    console.log('fetching users');
    yield put(fetchUsers());
  });
}

function* swapOrderWatcher() {
  yield takeLatest(swapOrdering, function* handler({ payload }) {
    yield put(fetchUsers());
  });
}

function* fetchUsersWatcher() {
  yield takeLatest(fetchUsers, function* handler({ payload }) {
    try {
      const searchQuery = yield select(getSearch);
      const filterQuery = yield select(getFilter);
      const baseRequestURL = `/api/users/`;
      const requestURL = searchQuery ? `/api/users/search/` + searchQuery : baseRequestURL;
      const args = '?' + (filterQuery.where ? `filter[where][verificationStatus]=${filterQuery.where.verificationStatus}&` : "") + (filterQuery.order ? `filter[order]=${filterQuery.order}` : "")
      const params = {
        method: 'GET',
        headers: { 'Authorization': window.access_token }
      };
      const result = yield call(request, { name: requestURL + args }, params);
      yield put(fetchUsersSuccess(result));
    } catch (error) {
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
    } catch ({ error }) {
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

function* createUserWatcher() {
  yield takeLatest(performCreatingUser, function* handler({ payload }) {
    try {
      const requestURL = '/api/users';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...payload.user,
          adminCreatingUser: true
        })
      };
      const createdUser = yield call(request, { name: requestURL }, params);
      yield put(createUserSuccess(createdUser));
      payload.toastSuccessCallBack('Invite sent to the email address successfully!');
    } catch ({ error }) {
      yield put(createUserError(error));
      if (error && error.message) {
        if (error.message.includes('Email already exists')) {
          yield put(stopSubmit('create_user', { email: `${payload.user.email} is already in use` }));
        }
      } else {
        payload.toastErrorCallBack('There was an error. Please Try again later');
      }
    }
  });
}
