import { put, fork, call, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  genericFetcher
} from 'containers/App/genericSagas';

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
  createUserError,
  transferToUser,
  fetchUserActivities,
  fetchUserActivitiesSuccess,
  fetchUserActivitiesError
} from './actions/user';

import {
  fetchAssets,
  fetchAssetsSuccess,
  fetchAssetsError,
  updateAsset,
  fetchAssetSuccess
} from './actions/asset';

import {
  fetchActivities,
  fetchActivitiesSuccess,
  fetchActivitiesError,
  approveWithdraw,
  denyWithdraw,
  denyTrade,
  confirmTrade,
  completeTrade,
  replaceActivity
} from './actions/activity';

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
  yield fork(transferToUserWatcher);

  yield fork(fetchActivitiesWatcher);
  yield fork(
    genericFetcher(
      fetchUserActivities,
      fetchUserActivitiesSuccess,
      fetchUserActivitiesError,
      null
    )
  );
  yield fork(cancelWithdrawalWatcher);
  yield fork(approveWithdrawalWatcher);
  yield fork(completeTradeWatcher);
  yield fork(confirmTradeWatcher);
  yield fork(cancelTradeWatcher);
}

export const getSearch = state => state.adminDashboard.usersSearch;
export const getFilter = state => state.adminDashboard.usersFilter;

function* completeTradeWatcher() {
  yield takeLatest(completeTrade, function* handler({ payload: { id, cb } }) {
    try {
      const requestURL = `/api/trades/completeTrade/`;
      const params = {
        method: 'POST',
        body: JSON.stringify({ id: id })
      };
      const result = yield call(request, { name: requestURL }, params);
      console.log('result', result);
      yield put(replaceActivity(result));
    } catch (error) {
      console.log('error', error);
      // yield put(loginTFAEnableError(error));
    }
  });
}

function* confirmTradeWatcher() {
  yield takeLatest(confirmTrade, function* handler({ payload: { id, cb } }) {
    try {
      const requestURL = `/api/trades/confirmTrade/`;
      const params = {
        method: 'POST',
        body: JSON.stringify({ id: id })
      };
      const result = yield call(request, { name: requestURL }, params);
      console.log('result', result);
      yield put(replaceActivity(result));
    } catch (error) {
      console.log('error', error);
      // yield put(loginTFAEnableError(error));
    }
  });
}

function* cancelTradeWatcher() {
  yield takeLatest(denyTrade, function* handler({ payload: { id, cb } }) {
    try {
      const requestURL = `/api/trades/cancelTrade/`;
      const params = {
        method: 'POST',
        body: JSON.stringify({ id: id })
      };
      const result = yield call(request, { name: requestURL }, params);
      console.log('result', result);
      yield put(replaceActivity(result));
      // put(replaceActivity(result));
    } catch (error) {
      console.log('error', error);
      // yield put(loginTFAEnableError(error));
    }
  });
}

function* cancelWithdrawalWatcher() {
  yield takeLatest(denyWithdraw, function* handler({ payload: { id, cb } }) {
    try {
      const requestURL = `/api/transfers/cancelWithdrawal/${id}`;
      const params = {
        method: 'POST'
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(replaceActivity(result));
    } catch (error) {
      // yield put(loginTFAEnableError(error));
    }
  });
}

function* approveWithdrawalWatcher() {
  yield takeLatest(approveWithdraw, function* handler({ payload: { id, cb } }) {
    try {
      const requestURL = `/api/transfers/completeWithdrawal/${id}`;

      const params = {
        method: 'POST'
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(replaceActivity(result));
    } catch (error) {
      // yield put(loginTFAEnableError(error));
    }
  });
}

function* transferToUserWatcher() {
  yield takeLatest(transferToUser, function* handler({ payload: { id, asset, amount, otp, showError} }) {
    try {
      const baseRequestURL = `/api/transfers/refund/`;
      console.log('building request', id, asset, amount, otp);
      const params = {
        method: 'POST',
        headers: { 'Authorization': window.access_token },
        body: JSON.stringify(
          {
            userId: id,
            coin: asset,
            amount: amount.toString(),
            otp: otp
          }
        )
      };
      console.log('sending request', params);
      const updateResult = yield call(request, { name: baseRequestURL }, params);
      console.log('after result', updateResult);
      yield put(fetchUser(id));
    } catch (error) {
      console.log('showError', showError);
      showError("Could not complete transfer");
      yield put(fetchAssetsError(error));
    }
  });
}

function* updateAssetWatcher() {
  yield takeLatest(updateAsset, function* handler({ payload: { data, id } }) {
    try {
      const baseRequestURL = `/api/assets/${id}/`;
      const params = {
        method: 'PATCH',
        headers: { 'Authorization': window.access_token },
        body: JSON.stringify(
          data
        )
      };
      const updateResult = yield call(request, { name: baseRequestURL }, params);
      const paramsFetch = {
        method: 'GET',
        headers: { 'Authorization': window.access_token }
      };
      const fetchResult = yield call(request, { name: baseRequestURL + `?filter=%7B%22custom_include%22%3A%5B%22populateValueAndMinimumPurchase%22%2C%20%22populateCommunityValues%22%2C%20%22populateCommunityQuantity%22%2C%20%22populatePrices%22%5D%7D` }, paramsFetch);
      yield put(fetchAssetSuccess(fetchResult));
    } catch (error) {
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
  });
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
        method: 'GET'
      };
      const result = yield call(request, { name: requestURL + args + '&filter[include][roleMapping]=role' }, params);
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

function* fetchActivitiesWatcher() {
  yield takeLatest(fetchActivities, function* handler({ payload }) {
    // const { globalData: { showSuccessSnackBar, showErrorSnackBar } } = yield select();
    try {
      const { filter = {} } = payload;

      const transformedFilter = {};
      if (filter.include) {
        transformedFilter.include = filter.include;
      }
      transformedFilter.limit = filter.limit || 10;
      transformedFilter.offset = filter.offset || 0;
      if (filter.order) {
        transformedFilter.order = filter.order;
      }
      if (filter.where) {
        transformedFilter.where = filter.where;
      }
      if (filter.custom_filter) {
        transformedFilter.custom_filter = filter.custom_filter;
      }
      const requestURL = payload.url || '/api/transfers';
      const targetURL = `${requestURL}${requestURL.includes('?') ? '&' : '?'}filter=${encodeURI(JSON.stringify(transformedFilter))}`;
      const params = {
        method: 'GET'
      };
      const [data = [], totalCount] = yield call(request, { name: targetURL }, params);
      yield put(fetchActivitiesSuccess({ data, totalCount }));
    } catch (error) {
      console.log(error);
      yield put(fetchActivitiesError());
    }
  });
}
