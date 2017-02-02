import isNull from 'lodash/isNull';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { getItem as getStoredItem, setItem } from './lib/storage';
import { API as AUTH_API, AUTH_STORAGE_KEY } from './modules/Auth/api';
import { ACTION_TYPES as AUTH_ACTION_TYPES } from './modules/Auth/actions';
import { fetchProperties } from './modules/Property/sagas';

export const ACTION_TYPES = {
  BOOT_REQUEST: 'BOOT_REQUEST',
  BOOT_SUCCESS: 'BOOT_SUCCESS',
  CHANGE_COUNTRY: 'CHANGE_COUNTRY',
  COUNTRY_CHANGED: 'COUNTRY_CHANGED',
};

const COUNTRY_KEY = 'COUNTRY';
const DEFAULT_COUNTRY = 'Kuwait';

export const ACTIONS = {
  boot,
  changeCountry,
};

// action creator
function boot() {
  return {
    type: ACTION_TYPES.BOOT_REQUEST,
  };
}


function changeCountry(country) {
  return {
    type: ACTION_TYPES.CHANGE_COUNTRY,
    country,
  };
}

// reducer
const initialState = {
  bootstrapped: false,
  country: DEFAULT_COUNTRY,
};

export function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.BOOT_REQUEST :
      return { ...state, bootstrapped: false };
    case ACTION_TYPES.BOOT_SUCCESS :
      return { ...state, bootstrapped: true };
    case ACTION_TYPES.COUNTRY_CHANGED :
      return { ...state, country: action.country };
    default:
      return initialState;
  }
}

// saga
function* bootApp() {
  const token = yield call(getStoredItem, AUTH_STORAGE_KEY);
  let currentCountry = yield call(getStoredItem, COUNTRY_KEY);

  if (isNull(currentCountry)) {
    const state = yield select();
    currentCountry = state.appReducer.country;
  }

  try {
    const response = yield call(AUTH_API.login, null, token);
    yield put({ type: AUTH_ACTION_TYPES.LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: AUTH_ACTION_TYPES.LOGIN_FAILURE, error });
  }
  yield put({ type: ACTION_TYPES.COUNTRY_CHANGED, country: currentCountry });
  yield put({ type: ACTION_TYPES.BOOT_SUCCESS });
}

function* changeCountrySaga(action) {
  yield call(setItem, COUNTRY_KEY, action.country);
  yield put({ type: ACTION_TYPES.COUNTRY_CHANGED, country: action.country });
  yield call(fetchProperties, action);
}

export function* bootstrapMonitor() {
  yield takeLatest(ACTION_TYPES.BOOT_REQUEST, bootApp);
}

export function* changeCountryMonitor() {
  yield takeLatest(ACTION_TYPES.CHANGE_COUNTRY, changeCountrySaga);
}
