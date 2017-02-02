import isNull from 'lodash/isNull';
import Store from '../../lib/store';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { ACTION_TYPES } from './actions';
import { ACTION_TYPES as PROPERTY_ACTIONS } from './../Property/actions';
import { API, AUTH_STORAGE_KEY } from './api';
import { setItem } from '../../lib/storage';
import { NavigationActions } from '@exponent/ex-navigation';

function* login(action) {
  try {
    const state = yield select();
    const token = state.authReducer.token;

    const response = yield call(API.login, action.credentials, token);

    yield put({ type: ACTION_TYPES.LOGIN_SUCCESS, payload: response.data });
    yield call(setItem, AUTH_STORAGE_KEY, response.data.api_token);

    // fetch properties (to get user's favorites)d
    yield put({ type: PROPERTY_ACTIONS.PROPERTY_RESET });
    yield put({ type: PROPERTY_ACTIONS.PROPERTY_REQUEST });

    const navigatorUID = Store.getState().navigation.currentNavigatorUID;

    if (!isNull(action.redirectUrl) && navigatorUID) {
      return Store.dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [action.redirectUrl], 0));
    }
  } catch (error) {
    yield put({ type: ACTION_TYPES.LOGIN_FAILURE, error });
  }
}

function* register(action) {
  try {
    const response = yield call(API.register, action.params);
    yield put({ type: ACTION_TYPES.REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ACTION_TYPES.REGISTER_FAILURE, error });
  }
}

export function* loginMonitor() {
  yield takeLatest(ACTION_TYPES.LOGIN_REQUEST, login);
}

export function* registerMonitor() {
  yield takeLatest(ACTION_TYPES.REGISTER_REQUEST, register);
}
