import { put,call,select,takeLatest,fork } from 'redux-saga/effects';
import { ACTION_TYPES } from './actions';
import { API } from './api';
import isEmpty from 'lodash/isEmpty';
import Qs from 'qs';
import { SELECTORS } from './selectors';

export function* fetchProperties(action) {
  try {
    const state = yield select();

    const country = state.appReducer.country;
    const apiToken = state.authReducer.token;
    const {bedroom,bathroom,parking,category,priceFrom,priceTo,sortBy,searchString} = SELECTORS.getFilters(state);
    let params = Qs.stringify({
      api_token:apiToken,
      bedroom,
      bathroom,
      parking,
      category,
      priceFrom,
      priceTo,
      sortBy,
      country,
      searchString
    });

    const {nextPageUrl} = state.propertyReducer;
    let urlParams;

    // set if there is no next page
    if(nextPageUrl === null) {
      return yield put({type: ACTION_TYPES.PROPERTY_FAILURE, error:'No Results'});
    }

    // initial query
    if(nextPageUrl === undefined) {
      urlParams = isEmpty(action.params) || action.params === undefined ? `/?${params}` : `/?${action.params}&${params}`;
    } else {
      urlParams = nextPageUrl
    }

    const response = yield call(API.fetchProperties,urlParams);
    yield put({type: ACTION_TYPES.PROPERTY_SUCCESS, payload:response.data});
  } catch (error) {
    yield put({type: ACTION_TYPES.PROPERTY_FAILURE, error})
  }
}

export function* fetchFavorites(action) {
  try {
    const state = yield select();
    const country = state.appReducer.country;
    const apiToken = state.authReducer.token;
    const {nextPageFavoritesUrl} = state.propertyReducer;
    let urlParams;
    // set if there is no next page
    if(nextPageFavoritesUrl === null) {
      return yield put({type: ACTION_TYPES.FAVORITE_FAILURE, error:'No Results'});
    }
    let params = Qs.stringify({
      api_token:apiToken,
      country
    });

    if(nextPageFavoritesUrl === undefined) {
      urlParams = isEmpty(action.params) ? `/?${params}` : `/?${action.params}&${params}`;
    } else {
      urlParams = nextPageFavoritesUrl
    }
    const response = yield call(API.fetchFavorites,urlParams);
    yield put({type: ACTION_TYPES.FAVORITE_SUCCESS, payload:response.data});
    yield put({type: ACTION_TYPES.PROPERTY_SUCCESS, payload:response.data});
  } catch (error) {
    yield put({type: ACTION_TYPES.FAVORITE_FAILURE, error})
  }
}

export function* fetchCategories(action) {
  try {
    const response = yield call(API.fetchCategories,action.params);
    yield put({type: ACTION_TYPES.CATEGORY_SUCCESS, payload:response.data});
  } catch (error) {
    yield put({type: ACTION_TYPES.CATEGORY_FAILURE, error})
  }
}

export function* propertyFavorite(action) {
  try {
    const state = yield select();
    const apiToken = state.authReducer.token;
    let urlParams = `?api_token=${apiToken}`;
    const response = yield call(API.favoriteProperty,urlParams,action.params);
    yield put({type: ACTION_TYPES.FAVORITE_PROPERTY_SUCCESS, payload:response});
  } catch (error) {
    yield put({type: ACTION_TYPES.FAVORITE_PROPERTY_FAILURE, error})
  }
}

export function* saveProperty(action) {

  // listings: {
  //   filters: {
  //     bedroomsArr:['Studio','1','2','3','4','5','6','7','7+'],
  //       bathroomsArr:['1','2','3','4','5','6','7','7+'],
  //       parkingArr:['No Parking','1','2','3','4','4+'],
  //   },
  //   done:false,
  //     stage:1,
  //     attributes:{
  //     type:'',
  //       category:'',
  //       title:'',
  //       description:'',
  //       price:'',
  //       address:{},
  //     meta:{
  //       bedroom:'Studio',
  //         bathroom:'1',
  //         kitchen:'1',
  //         area:'',
  //         parking:'No Parking',
  //     },
  //     images:[],
  //       amenities:[],
  //       tags:[],
  //   },
  // }

  try {
    const state = yield select();
    const country = state.appReducer.country;
    const apiToken = state.authReducer.token;
    const {attributes} = SELECTORS.getListing(state);
    const {type,category,title,description,price,address,meta,images,amenities,tags} = attributes;

    let params = {
      api_token:apiToken,
      type,
      category,
      title,
      description,
      price,
      address,
      meta,
      images,
      amenities,
      tags
    }

    // let urlParams;

    // set if there is no next page
    // urlParams = isEmpty(action.params) || action.params === undefined ? `/?${params}` : `/?${action.params}&${params}`;

    const response = yield call(API.saveProperty,params);
    yield put({type: ACTION_TYPES.SAVE_PROPERTY_SUCCESS, payload:response});
  } catch (error) {
    yield put({type: ACTION_TYPES.SAVE_PROPERTY_FAILURE, error})
  }
}


export function* propertyMonitor() {
  yield takeLatest(ACTION_TYPES.PROPERTY_REQUEST,fetchProperties);
}

export function* propertyFavoriteMonitor() {
  yield takeLatest(ACTION_TYPES.FAVORITE_PROPERTY_REQUEST,propertyFavorite);
}

export function* favoriteMonitor() {
  yield takeLatest(ACTION_TYPES.FAVORITE_REQUEST,fetchFavorites);
}

export function* categoryMonitor() {
  yield takeLatest(ACTION_TYPES.CATEGORY_REQUEST,fetchCategories);
}

export function* saveMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_PROPERTY_REQUEST,saveProperty);
}