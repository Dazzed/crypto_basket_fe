import { put, fork, call, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import request from 'helpers/request';
import { stopSubmit } from 'redux-form';

import {
  startEnablingTFALogin,
  performEnablingTFALogin,
  loginTFAEnableSuccess,
  loginTFAEnableError,
  loginTFADisableSuccess,
  loginTFADisableError,
  performEnablingTFAWithdrawal,
  withdrawalTFAEnableSuccess,
  withdrawalTFAEnableError,
  withdrawalTFADisableSuccess,
  withdrawalTFADisableError,
  updateQrCodeAndManual,
  startEnablingTFAWithdrawal,
  updateTfaEnabledWithOtp
} from './actions/twoFactorAuthActions';

import {
  confirmChangingPassword,
  changePasswordSuccess,
  changePasswordError
} from './actions/changePassword';

import {
  showPurchaseUnsuccessfulModal,
  hidePurchaseUnsuccessfulModal,
  performEstimatingTrade,
  estimateTradeSuccess,
  estimateTradeError,
  performInitiatingTrade,
  initiateTradeSuccess,
  initiateTradeError
} from './actions/buyActions';

import {
  showSaleUnsuccessfulModal,
  hideSaleUnsuccessfulModal,
  salePerformEstimatingTrade,
  saleEstimateTradeSuccess,
  saleEstimateTradeError,
  salePerformInitiatingTrade,
  saleInitiateTradeSuccess,
  saleInitiateTradeError
} from './actions/sellActions';

import {
  performPatchingUser,
  patchUserSuccess,
  patchUserError,
  fetchAllAssets,
  fetchAllAssetsSuccess,
  fetchAllAssetsError,
  getUser
} from './actions/common';

import {
  fetchActivities,
  fetchActivitiesSuccess,
  fetchActivitiesError
} from './actions/activity';

import {
  authSucess
} from '../App/actions';

export default function* main() {
  yield fork(tfaLoginEnableWatcherInitial);
  yield fork(tfaLoginEnableWatcherFinal);

  yield fork(tfaWithdrawalEnableWatcherInitial);
  yield fork(tfaWithdrawalEnableWatcherFinal);

  yield fork(updateFlagWithOTP);
  yield fork(changePasswordWatcher);
  yield fork(patchUserWatcher);
  yield fork(fetchAssetsWather);

  yield fork(estimateTradeWatcher);
  yield fork(initiateTradeWatcher);

  yield fork(estimateTradeWatcherForSale);
  yield fork(initiateTradeWatcherForSale);

  yield fork(fetchActivitiesWatcher);
  yield fork(getUserWatcher);
}

function constructErrorMessage(type, minMax, ticker) {
  if (type === 'generic') {
    return 'We\'re sorry, but you don\'t currently have enough funds to complete this ' +
      'transaction. Please make a deposit, or try again with a different amount.';
  }
  return `We\'re sorry, but this ${type} amount violates ${minMax} trade amount for ` +
    `${ticker}. Please try again with a different amount`;
}

function* tfaLoginEnableWatcherInitial() {
  yield takeLatest(startEnablingTFALogin, function* handler({ payload: twoFactorToken }) {
    try {
      const requestURL = `/api/users/initiateTwoFactor/${twoFactorToken}`;
      const params = {
        method: 'GET'
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(updateQrCodeAndManual(result));
    } catch (error) {
      yield put(loginTFAEnableError(error));
    }
  });
}

function* tfaLoginEnableWatcherFinal() {
  yield takeLatest(performEnablingTFALogin, function* handler({ payload }) {
    try {
      const requestURL = '/api/users/verifyTwoFactor';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          type: 'login'
        })
      };
      yield call(request, { name: requestURL }, params);
      yield put(loginTFAEnableSuccess());
    } catch (error) {
      yield put(loginTFAEnableError(error));
      yield put(stopSubmit('otp_form', { otp: 'Invalid OTP' }));
    }
  });
}

function* tfaWithdrawalEnableWatcherInitial() {
  yield takeLatest(startEnablingTFAWithdrawal, function* handler({ payload: twoFactorToken }) {
    try {
      const requestURL = `/api/users/initiateTwoFactor/${twoFactorToken}`;
      const params = {
        method: 'GET'
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(updateQrCodeAndManual(result));
    } catch (error) {
      yield put(withdrawalTFAEnableError(error));
    }
  });
}

function* tfaWithdrawalEnableWatcherFinal() {
  yield takeLatest(performEnablingTFAWithdrawal, function* handler({ payload }) {
    try {
      const requestURL = '/api/users/verifyTwoFactor';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          type: 'withdrawal'
        })
      };
      yield call(request, { name: requestURL }, params);
      yield put(withdrawalTFAEnableSuccess());
    } catch (error) {
      yield put(withdrawalTFAEnableError(error));
      yield put(stopSubmit('otp_form', { otp: 'Invalid OTP' }));
    }
  });
}

function* updateFlagWithOTP() {
  /* eslint-disable no-lonely-if */
  yield takeLatest(updateTfaEnabledWithOtp, function* handler({ payload }) {
    const {
      userId, flagName, value, otp
    } = payload;
    try {
      const requestURL = `/api/users/${userId}`;
      const params = {
        method: 'PATCH',
        body: JSON.stringify({
          [flagName]: value,
          otp
        })
      };
      yield call(request, { name: requestURL }, params);
      // yield put(withdrawalTFAEnableSuccess());
      if (flagName === 'twoFactorLoginEnabled') {
        if (value === true) {
          yield put(loginTFAEnableSuccess());
        } else {
          yield put(loginTFADisableSuccess());
        }
      } else {
        if (value === true) {
          yield put(withdrawalTFAEnableSuccess());
        } else {
          yield put(withdrawalTFADisableSuccess());
        }
      }
    } catch (error) {
      if (flagName === 'twoFactorLoginEnabled') {
        if (value === true) {
          yield put(loginTFAEnableError());
        } else {
          yield put(loginTFADisableError());
        }
      } else {
        if (value === true) {
          yield put(withdrawalTFAEnableError());
        } else {
          yield put(withdrawalTFADisableError());
        }
      }
      yield put(stopSubmit('otp_form', { otp: 'Invalid OTP' }));
    }
  });
}

function* changePasswordWatcher() {
  yield takeLatest(confirmChangingPassword, function* handler({ payload }) {
    try {
      const requestURL = '/api/users/change-password';
      const params = {
        method: 'POST',
        body: JSON.stringify(payload)
      };
      yield call(request, { name: requestURL }, params);
      yield put(changePasswordSuccess());
      payload.toastSuccessCallBack('Password Changed Successfully!');
    } catch (error) {
      yield put(changePasswordError());
      yield put(stopSubmit('change_password', { oldPassword: 'Invalid Old Password' }));
    }
  });
}

function* patchUserWatcher() {
  yield takeLatest(performPatchingUser, function* handler({ payload }) {
    try {
      const {
        user,
        values
      } = payload;
      if (values.dob) {
        values.dob = values.dob.format('YYYY-MM-DD');
      }
      const requestURL = `/api/users/${user.id}`;
      const params = {
        method: 'PATCH',
        body: JSON.stringify(values)
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(patchUserSuccess(result));
      // yield put(destroy('user_verification'));
      payload.toastSuccessCallBack('Your information is updated successfully!');
    } catch (error) {
      yield put(patchUserError());
      // yield put(stopSubmit('change_password', { oldPassword: 'Invalid Old Password' }));
      payload.toastErrorCallBack('There was an error');
    }
  });
}

function* getUserWatcher() {
  yield takeLatest(getUser, function* handler({ payload }) {
    try {
      const user = payload;
      const requestURL = `/api/users/${user.id}?filter=%7B%22include%22%3A%7B%20%22relation%22%3A%22wallets%22%2C%22scope%22%3A%7B%22include%22%3A%7B%22relation%22%3A%22asset%22%7D%7D%7D%7D`;
      const params = {
        method: 'GET',
      };
      const result = yield call(request, { name: requestURL }, params);
      yield put(authSucess(result));
      // yield put(destroy('user_verification'));
      // payload.toastSuccessCallBack('Your information is updated successfully!');
    } catch (error) {
      console.log('error', error);
      yield put(patchUserError());
      // yield put(stopSubmit('change_password', { oldPassword: 'Invalid Old Password' }));
      // payload.toastErrorCallBack('There was an error');
    }
  });
}

function* fetchAssetsWather() {
  yield takeLatest(fetchAllAssets, function* handler({ payload }) {
    try {
      const requestURL = '/api/assets';
      const params = {
        method: 'GET'
      };
      const results = yield call(request, { name: requestURL }, params);
      yield put(fetchAllAssetsSuccess(results.filter(({ hidden }) => !hidden)));
    } catch (error) {
      yield put(fetchAllAssetsError());
      payload.toastErrorCallBack('There was an error fetching details. Reload your page.');
    }
  });
}

function* estimateTradeWatcher() {
  yield takeLatest(performEstimatingTrade, function* handler({ payload }) {
    const {
      fromAssetId,
      toAssetId,
      fromAssetAmount,
      toAssetAmount,
      tradeType,
      successCallback,
      errorCallback,
      callback
    } = payload;
    try {
      // 1. Perform validations
      const {
        globalData: {
          currentUser: {
            wallets: myWallets
          }
        },
        userDashboard: {
          allAssets
        }
      } = yield select();
      const fromAsset = allAssets.find(({ id }) => id === fromAssetId);
      const toAsset = allAssets.find(({ id }) => id === toAssetId);
      const myFromWallet = myWallets.find(({ assetId }) => assetId === fromAsset.ticker);
      const myToWallet = myWallets.find(({ assetId }) => assetId === toAsset.ticker);

      // if ((fromAssetAmount > myFromWallet.balance)) {
      //   return yield put(
      //     showPurchaseUnsuccessfulModal(
      //       constructErrorMessage('generic')
      //     )
      //   );
      // }
      if (toAssetAmount < toAsset.minPurchaseAmount) {
        return yield put(
          showPurchaseUnsuccessfulModal(
            constructErrorMessage('purchase', 'minimum', toAsset.ticker.toUpperCase())
          )
        );
      } else if (toAssetAmount > toAsset.maxPurchaseAmount) {
        return yield put(
          showPurchaseUnsuccessfulModal(
            constructErrorMessage('purchase', 'maximum', toAsset.ticker.toUpperCase())
          )
        );
      }
      // 2. Call estimate trade API
      const requestURL = '/api/trades/estimateTrade';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          fromAssetId,
          toAssetId,
          fromAssetAmount,
          toAssetAmount,
          tradeType
        })
      };
      const { message: results } = yield call(request, { name: requestURL }, params);
      yield put(estimateTradeSuccess(results));
    } catch (error) {
      console.log(error);
      if (error.message) {
        yield put(
          showPurchaseUnsuccessfulModal(
            constructErrorMessage('generic')
          )
        );
      } else {
        errorCallback('There was an error estimating details. Reload your page.');
      }
      yield put(estimateTradeError());
    }
  });
}

function* initiateTradeWatcher() {
  yield takeLatest(performInitiatingTrade, function* handler({ payload }) {
    const {
      errorCallback,
    } = payload;
    try {
      // 1. Perform validations
      const {
        userDashboard: {
          estimateTradeResult
        }
      } = yield select();

      // 2. Call estimate trade API
      const requestURL = '/api/trades/initiateTrade';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...estimateTradeResult,
          tradeType: 'buy'
        })
      };
      const { message: results, myWallets } = yield call(request, { name: requestURL }, params);
      yield put(initiateTradeSuccess({ results, myWallets }));
    } catch (error) {
      console.log(error);
      if (error.message) {
        yield put(
          showPurchaseUnsuccessfulModal(
            constructErrorMessage('generic')
          )
        );
      } else {
        errorCallback('There was an error initiating trade. Reload your page.');
      }
      yield put(initiateTradeError());
    }
  });
}

function* estimateTradeWatcherForSale() {
  yield takeLatest(salePerformEstimatingTrade, function* handler({ payload }) {
    const {
      fromAssetId,
      toAssetId,
      fromAssetAmount,
      toAssetAmount,
      tradeType,
      successCallback,
      errorCallback,
      callback
    } = payload;
    try {
      // 1. Perform validations
      const {
        globalData: {
          currentUser: {
            wallets: myWallets
          }
        },
        userDashboard: {
          allAssets
        }
      } = yield select();
      const fromAsset = allAssets.find(({ id }) => id === fromAssetId);
      const toAsset = allAssets.find(({ id }) => id === toAssetId);
      const myFromWallet = myWallets.find(({ assetId }) => assetId === fromAsset.ticker);
      const myToWallet = myWallets.find(({ assetId }) => assetId === toAsset.ticker);

      // if ((fromAssetAmount > myFromWallet.balance)) {
      //   return yield put(
      //     showSaleUnsuccessfulModal(
      //       constructErrorMessage('generic')
      //     )
      //   );
      // }
      if (fromAssetAmount < Number(fromAsset.minSaleAmount)) {
        return yield put(
          showSaleUnsuccessfulModal(
            constructErrorMessage('sale', 'minimum', toAsset.ticker.toUpperCase())
          )
        );
      } else if (fromAssetAmount > Number(fromAsset.maxSaleAmount)) {
        return yield put(
          showSaleUnsuccessfulModal(
            constructErrorMessage('sale', 'maximum', toAsset.ticker.toUpperCase())
          )
        );
      }
      // 2. Call estimate trade API
      const requestURL = '/api/trades/estimateTrade';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          fromAssetId,
          toAssetId,
          fromAssetAmount,
          toAssetAmount,
          tradeType
        })
      };
      const { message: results } = yield call(request, { name: requestURL }, params);
      yield put(saleEstimateTradeSuccess(results));
    } catch (error) {
      console.log(error);
      if (error.message) {
        yield put(
          showSaleUnsuccessfulModal(
            constructErrorMessage('generic')
          )
        );
      } else {
        errorCallback('There was an error estimating details. Reload your page.');
      }
      yield put(saleEstimateTradeError());
    }
  });
}

function* initiateTradeWatcherForSale() {
  yield takeLatest(salePerformInitiatingTrade, function* handler({ payload }) {
    const {
      errorCallback,
    } = payload;
    try {
      // 1. Perform validations
      const {
        userDashboard: {
          saleEstimateTradeResult
        }
      } = yield select();

      // 2. Call estimate trade API
      const requestURL = '/api/trades/initiateTrade';
      const params = {
        method: 'POST',
        body: JSON.stringify({
          ...saleEstimateTradeResult,
          tradeType: 'sell'
        })
      };
      const { message: results, myWallets } = yield call(request, { name: requestURL }, params);
      yield put(saleInitiateTradeSuccess({ results, myWallets }));
    } catch (error) {
      console.log(error);
      if (error.message) {
        yield put(
          showSaleUnsuccessfulModal(
            constructErrorMessage('generic')
          )
        );
      } else {
        errorCallback('There was an error initiating trade. Reload your page.');
      }
      yield put(saleInitiateTradeError());
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
      if (filter.orderBy) {
        if (!filter.order) {
          throw new Error('filter.orderBy is given, But not filer.order');
        }
        transformedFilter.order = `${filter.orderBy} ${filter.order || 'asc'}`;
      }
      if (filter.where) {
        transformedFilter.where = filter.where;
      }
      if (filter.custom_filter) {
        transformedFilter.custom_filter = filter.custom_filter;
      }
      const requestURL = payload.url;
      if (!requestURL) throw new Error('payload.url is required');
      const targetURL = `${requestURL}?filter=${encodeURI(JSON.stringify(transformedFilter))}`;
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
