import {
  put,
  call,
  takeLatest,
  select
} from 'redux-saga/effects';

import request from 'helpers/request';
import SuperCompare from 'helpers/superCompare';

export function genericFetcher(ACTION, SUCCESS_ACTION, ERROR_ACTION, requestURL) {
  return function* () {
    yield takeLatest(ACTION, function* handler({ payload }) {
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

        const targetURL = `${requestURL}?filter=${encodeURI(JSON.stringify(transformedFilter))}`;
        const params = {
          method: 'GET'
        };
        const [data, totalCount] = yield call(request, { name: targetURL }, params);
        yield put(SUCCESS_ACTION({ data, totalCount }));
      } catch (error) {
        console.log(error);
        yield put(ERROR_ACTION());
      }
    });
  };
}

export function genericPost(ACTION, SUCCESS_ACTION, ERROR_ACTION, requestURL, modelName) {
  return function* () {
    yield takeLatest(ACTION, function* handler({ payload }) {
      const { globalData: { showSuccessSnackBar, showErrorSnackBar } } = yield select();
      try {
        const params = {
          method: 'POST',
          body: JSON.stringify(payload.values)
        };
        const result = yield call(request, { name: requestURL }, params);
        yield put(SUCCESS_ACTION(result));
        showSuccessSnackBar(`${modelName} created successfully!`);
        if (payload.callback) {
          payload.callback();
        }
      } catch (error) {
        console.log(error);
        yield put(ERROR_ACTION());
        showErrorSnackBar('There was an error. Please try again');
      }
    });
  };
}

export function genericEdit(
  ACTION,
  SUCCESS_ACTION,
  ERROR_ACTION,
  requestURL,
  modelName,
  propertiesToIgnore
) {
  return function* () {
    yield takeLatest(ACTION, function* handler({ payload }) {
      const { globalData: { showSuccessSnackBar, showErrorSnackBar } } = yield select();
      try {
        const {
          oldValues,
          newValues,
          callback
        } = payload;
        const diff = SuperCompare(oldValues, newValues, propertiesToIgnore);
        const params = {
          method: 'PATCH',
          body: JSON.stringify(diff)
        };
        const result = yield call(request, { name: `${requestURL}/${oldValues.id}` }, params);
        yield put(SUCCESS_ACTION(result));
        showSuccessSnackBar(`${modelName} edited successfully!`);
        if (callback) callback();
      } catch (error) {
        console.log(error);
        yield put(ERROR_ACTION());
        showErrorSnackBar('There was an error. Please try again');
      }
    });
  };
}

export function genericDelete(ACTION, SUCCESS_ACTION, ERROR_ACTION, requestURL, modelName) {
  return function* () {
    yield takeLatest(ACTION, function* handler({ payload }) {
      const { globalData: { showSuccessSnackBar, showErrorSnackBar } } = yield select();
      try {
        const params = {
          method: 'DELETE',
        };
        yield call(request, { name: `${requestURL}/${payload.values.id}` }, params);
        yield put(SUCCESS_ACTION(payload.values));
        showSuccessSnackBar(`${modelName} deleted successfully!`);
      } catch (error) {
        console.log(error);
        yield put(ERROR_ACTION());
        showErrorSnackBar('There was an error. Please try again');
      }
    });
  };
}
