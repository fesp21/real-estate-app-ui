import includes from 'lodash/includes';

export const ACTION_TYPES = {
  PROPERTY_REQUEST : 'PROPERTY_REQUEST',
  PROPERTY_SUCCESS : 'PROPERTY_SUCCESS',
  PROPERTY_FAILURE : 'PROPERTY_FAILURE',
  CATEGORY_REQUEST : 'CATEGORY_REQUEST',
  CATEGORY_SUCCESS : 'CATEGORY_SUCCESS',
  CATEGORY_FAILURE : 'CATEGORY_FAILURE',
  FILTER_CHANGE : 'FILTER_CHANGE',
  SEARCH_REQUEST : 'SEARCH_REQUEST',
  FAVORITE_PROPERTY_REQUEST : 'FAVORITE_PROPERTY_REQUEST',
  FAVORITE_PROPERTY_SUCCESS : 'FAVORITE_PROPERTY_SUCCESS',
  FAVORITE_PROPERTY_FAILURE : 'FAVORITE_PROPERTY_FAILURE',
  FAVORITE_SUCCESS : 'FAVORITE_SUCCESS',
  FAVORITE_REQUEST : 'FAVORITE_REQUEST',
  FAVORITE_FAILURE : 'FAVORITE_FAILURE',
  LISTING_CHANGE : 'LISTING_CHANGE',
  SAVE_PROPERTY_REQUEST: 'SAVE_LISTING_REQUEST',
  SAVE_PROPERTY_SUCCESS: 'SAVE_LISTING_SUCCESS',
  SAVE_PROPERTY_FAILURE: 'SAVE_LISTING_FAILURE',
};

function fetchProperties(params) {
  return {
    type: ACTION_TYPES.PROPERTY_REQUEST,
    params:params
  }
}

function fetchFavorites(params ='') {
  return {
    type: ACTION_TYPES.FAVORITE_REQUEST,
    params
  }
}


function fetchCategories(params) {
  return {
    type: ACTION_TYPES.CATEGORY_REQUEST,
    params
  }
}

function changeFormValue(field,value) {
  return {
    type: ACTION_TYPES.FILTER_CHANGE,
    field,
    value
  }
}

function searchRequested() {
  return {
    type: ACTION_TYPES.SEARCH_REQUEST,
  }
}

function favoriteProperty(property) {
  return {
    type:ACTION_TYPES.FAVORITE_PROPERTY_REQUEST,
    params:{
      itemID:property._id,
      newItemAttributes: {
        isFavorited : !property.isFavorited
      }
    },
  }
}

function changeListingValue(payload) {
  return {
    type:ACTION_TYPES.LISTING_CHANGE,
    payload,
  }
}

function saveProperty() {
  return {
    type:ACTION_TYPES.SAVE_PROPERTY_REQUEST
  }
}

export const ACTIONS = {
  fetchProperties,
  fetchCategories,
  changeFormValue,
  searchRequested,
  favoriteProperty,
  fetchFavorites,
  changeListingValue,
  saveProperty
};