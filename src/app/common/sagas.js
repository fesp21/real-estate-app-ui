import isNull from "lodash/isNull";
import { put, call, select, takeLatest } from "redux-saga/effects";
import { getItem as getStoredItem, setItem } from "../../common/storage";
import { API as AUTH_API, AUTH_STORAGE_KEY } from "../../auth/common/api";
import { ACTION_TYPES as AUTH_ACTION_TYPES } from "../../auth/common/actions";
import { fetchProperties } from "../../property/common/sagas";
import { ACTION_TYPES } from "./actions";
import { COUNTRY_KEY } from "./reducer";

function* bootApp() {
  const token = yield call(getStoredItem, AUTH_STORAGE_KEY);
  let currentCountry = yield call(getStoredItem, COUNTRY_KEY);

  if (isNull(currentCountry)) {
    const state = yield select();
    currentCountry = state.appReducer.country;
  }

  try {
    const response = yield call(AUTH_API.login, null, token);
    yield put({
      type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
      payload: response.data
    });
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
