import Qs from 'qs';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import Router from './../../lib/router';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { ACTION_TYPES } from './actions';
import { API } from './api';
import { SELECTORS } from './selectors';
import { getFileName } from './../../lib/functions';
import { NavigationActions } from '@exponent/ex-navigation';
import Store from './../../lib/store';

export function* fetchProperties(action) {
  try {
    const state = yield select();

    const country = state.appReducer.country;
    const apiToken = state.authReducer.token;
    const { bedroom, bathroom, parking, category, priceFrom, priceTo, sortBy, searchString } = SELECTORS.getFilters(state);
    const params = Qs.stringify({
      api_token: apiToken,
      country,
      bedroom,
      bathroom,
      parking,
      category,
      priceFrom,
      priceTo,
      sortBy,
      searchString,
    });
    const { nextPageUrl } = state.propertyReducer;
    let urlParams;

    // set if there is no next page
    if (nextPageUrl === null) {
      return yield put({ type: ACTION_TYPES.PROPERTY_FAILURE, error: 'No Results' });
    }

    // initial query
    if (nextPageUrl === undefined) {
      urlParams = isEmpty(action.params) || action.params === undefined ? `/?${params}` : `/?${action.params}&${params}`;
    } else {
      urlParams = nextPageUrl;
    }

    const response = yield call(API.fetchProperties, urlParams);
    yield put({ type: ACTION_TYPES.PROPERTY_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ACTION_TYPES.PROPERTY_FAILURE, error });
  }
}

export function* fetchFavorites(action) {
  try {
    const state = yield select();
    const country = state.appReducer.country;
    const apiToken = state.authReducer.token;
    const { nextPageFavoritesUrl } = state.propertyReducer;
    let urlParams;
    // set if there is no next page
    if (nextPageFavoritesUrl === null) {
      return yield put({ type: ACTION_TYPES.FAVORITES_FAILURE, error: 'No Results' });
    }

    const params = Qs.stringify({ api_token: apiToken, country });

    if (nextPageFavoritesUrl === undefined) {
      urlParams = isEmpty(action.params) ? `/?${params}` : `/?${action.params}&${params}`;
    } else {
      urlParams = nextPageFavoritesUrl;
    }
    const response = yield call(API.fetchFavorites, urlParams);
    yield put({ type: ACTION_TYPES.FAVORITES_SUCCESS, payload: response.data });
    yield put({ type: ACTION_TYPES.PROPERTY_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FAVORITES_FAILURE, error });
  }
}

export function* favoriteProperty(action) {
  try {
    const state = yield select();
    const apiToken = state.authReducer.token;
    if (isEmpty(apiToken)) {
      const navigatorUID = Store.getState().navigation.currentNavigatorUID;
      return Store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute('login', { redirectRoute: 'propertyList' })));
    }
    yield put({ type: ACTION_TYPES.PROPERTY_FAVORITE_OPTIMISTIC_UPDATE, payload: action });
    const urlParams = `?api_token=${apiToken}`;
    const response = yield call(API.favoriteProperty, urlParams, action.params);
    yield put({ type: ACTION_TYPES.PROPERTY_FAVORITE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.PROPERTY_FAVORITE_FAILURE, error });
  }
}

export function* saveProperty() {
  try {
    const state = yield select();
    const country = state.appReducer.country;
    const apiToken = state.authReducer.token;
    const { attributes } = SELECTORS.getListing(state);
    const { type, category, title, description, price, address, meta, images, amenities, tags } = attributes;
    const params = { country, type, category, title, description, price, address, meta, images, amenities, tags };
    const urlParams = `api_token=${apiToken}`;
    const response = yield call(API.saveProperty, params, urlParams);

    const formData = new FormData();
    map(images, img => formData.append('images[]', { uri: img, name: getFileName(img), type: 'image/jpg' }));
    const imageResponse = yield call(API.uploadImage, response.data._id, formData);

    yield put({ type: ACTION_TYPES.PROPERTY_SAVE_SUCCESS, payload: imageResponse });
    yield put({ type: ACTION_TYPES.PROPERTY_RESET });
    yield put({ type: ACTION_TYPES.FILTER_RESET });
    yield put({ type: ACTION_TYPES.PROPERTY_REQUEST });
  } catch (error) {
    yield put({ type: ACTION_TYPES.PROPERTY_SAVE_FAILURE, error });
  }
}

export function* propertyMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_REQUEST, fetchProperties);
}

export function* favoriteMonitor() {
  yield takeLatest(ACTION_TYPES.FAVORITES_REQUEST, fetchFavorites);
}

export function* propertyFavoriteMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_FAVORITE_REQUEST, favoriteProperty);
}

export function* saveMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_SAVE_REQUEST, saveProperty);
}
