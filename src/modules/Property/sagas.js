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

  try {
    const state = yield select();
    const country = state.appReducer.country;
    const apiToken = state.authReducer.token;
    const {attributes} = SELECTORS.getListing(state);
    const {type,category,title,description,price,address,meta,images,amenities,tags} = attributes;

    // console.log('images0',images[0]);
    // let body = {
    //   api_token:apiToken,
    //   country,
    //   type,
    //   category,
    //   title,
    //   description,
    //   price,
    //   address,
    //   meta,
    //   // images,
    //   amenities,
    //   tags,
    //   image:{uri:images[0],name:'image1',ext:'image/jpg','type':'multipart/form-data'}
    // };

    let formdata = new FormData();

    formdata.append("product", 'test');
    formdata.append("avatar", {uri: images[0], name: 'image.jpg', type: 'image/jpg'});

    fetch('http://re.dev/api/properties', {
      method: 'post',
      headers: {
        // 'Content-Type': 'application/json',
      },
      body: formdata
    })
      .then(response => response.json())
      .then(res => {
        console.log('res',res);
      })
      .catch(err => {
        console.log(err)
      });

    // const response = yield call(API.saveProperty,body);
    // yield put({type: ACTION_TYPES.SAVE_PROPERTY_SUCCESS, payload:response});
  } catch (error) {
    console.log('er',error);
    // yield put({type: ACTION_TYPES.SAVE_PROPERTY_FAILURE, error})
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