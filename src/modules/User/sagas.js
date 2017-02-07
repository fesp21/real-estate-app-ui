import { put, call, select, takeLatest, fork } from 'redux-saga/effects';
import { ACTION_TYPES } from './actions';
import { API } from './api';
import { SELECTORS } from './selectors';
import Qs from 'qs';
import isEmpty from 'lodash/isEmpty';

export function* fetchUser(action) {
  try {
    const state = yield select();

    const api_token = state.authReducer.token;
    yield put({ type: ACTION_TYPES.USER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ACTION_TYPES.USER_FAILURE, error });
  }
}

export function* updateUser(action) {
  try {
    const state = yield select();
    const apiToken = state.authReducer.token;
    const urlParams = `api_token=${apiToken}`;
    const params = action.params;
    const response = yield call(API.updateUser, params, urlParams);
    yield put({ type: ACTION_TYPES.USER_UPDATE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ACTION_TYPES.USER_UPDATE_FAILURE, error });
  }
}


export function* userMonitor() {
  yield takeLatest(ACTION_TYPES.USER_REQUEST, fetchUser);
}

export function* userUpdateMonitor() {
  yield takeLatest(ACTION_TYPES.USER_UPDATE_REQUEST, updateUser);
}
