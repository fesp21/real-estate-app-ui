import includes from 'lodash/includes';

export const ACTION_TYPES = {
  PROPERTY_REQUEST : 'PROPERTY_REQUEST',
  PROPERTY_SUCCESS : 'PROPERTY_SUCCESS',
  PROPERTY_FAILURE : 'PROPERTY_FAILURE',
  // CATEGORY_REQUEST : 'CATEGORY_REQUEST',
  // CATEGORY_SUCCESS : 'CATEGORY_SUCCESS',
  // CATEGORY_FAILURE : 'CATEGORY_FAILURE',
  FILTER_CHANGE : 'FILTER_CHANGE',
  PROPERTY_RESET : 'PROPERTY_RESET',
  PROPERTY_FAVORITE_REQUEST : 'PROPERTY_FAVORITE_REQUEST',
  PROPERTY_FAVORITE_SUCCESS : 'PROPERTY_FAVORITE_SUCCESS',
  PROPERTY_FAVORITE_FAILURE : 'PROPERTY_FAVORITE_FAILURE',
  FAVORITE_SUCCESS : 'FAVORITE_SUCCESS',
  FAVORITE_REQUEST : 'FAVORITE_REQUEST',
  FAVORITE_FAILURE : 'FAVORITE_FAILURE',
  LISTING_CHANGE : 'LISTING_CHANGE',
  PROPERTY_SAVE_REQUEST: 'PROPERTY_SAVE_REQUEST',
  PROPERTY_SAVE_SUCCESS: 'PROPERTY_SAVE_SUCCESS',
  PROPERTY_SAVE_FAILURE: 'PROPERTY_SAVE_FAILURE',
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


// function fetchCategories(params) {
//   return {
//     type: ACTION_TYPES.CATEGORY_REQUEST,
//     params
//   }
// }

function changeFormValue(field,value) {
  return {
    type: ACTION_TYPES.FILTER_CHANGE,
    field,
    value
  }
}

function invalidateProperty() {
  return {
    type: ACTION_TYPES.PROPERTY_RESET,
  }
}

function favoriteProperty(property) {
  return {
    type:ACTION_TYPES.PROPERTY_FAVORITE_REQUEST,
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
    type:ACTION_TYPES.PROPERTY_SAVE_REQUEST
  }
}

export const ACTIONS = {
  fetchProperties,
  // fetchCategories,
  changeFormValue,
  invalidateProperty,
  favoriteProperty,
  fetchFavorites,
  changeListingValue,
  saveProperty
};