export const ACTION_TYPES = {
  PROPERTY_REQUEST: 'PROPERTY_REQUEST',
  PROPERTY_SUCCESS: 'PROPERTY_SUCCESS',
  PROPERTY_FAILURE: 'PROPERTY_FAILURE',
  PROPERTY_RESET: 'PROPERTY_RESET',
  PROPERTY_FAVORITE_REQUEST: 'PROPERTY_FAVORITE_REQUEST',
  PROPERTY_FAVORITE_SUCCESS: 'PROPERTY_FAVORITE_SUCCESS',
  PROPERTY_FAVORITE_FAILURE: 'PROPERTY_FAVORITE_FAILURE',
  FAVORITES_SUCCESS: 'FAVORITES_SUCCESS',
  FAVORITES_REQUEST: 'FAVORITES_REQUEST',
  FAVORITES_FAILURE: 'FAVORITES_FAILURE',
  PROPERTY_SAVE_REQUEST: 'PROPERTY_SAVE_REQUEST',
  PROPERTY_SAVE_SUCCESS: 'PROPERTY_SAVE_SUCCESS',
  PROPERTY_SAVE_FAILURE: 'PROPERTY_SAVE_FAILURE',
  FILTER_CHANGE: 'FILTER_CHANGE',
  LISTING_CHANGE: 'LISTING_CHANGE',
  FILTER_RESET: 'FILTER_RESET',
  PROPERTY_FAVORITE_OPTIMISTIC_UPDATE: 'PROPERTY_FAVORITE_OPTIMISTIC_UPDATE',
};

function fetchProperties(params) {
  return {
    type: ACTION_TYPES.PROPERTY_REQUEST,
    params,
  };
}

function fetchFavorites(params) {
  return {
    type: ACTION_TYPES.FAVORITES_REQUEST,
    params,
  };
}

function changeFormValue(field, value) {
  return {
    type: ACTION_TYPES.FILTER_CHANGE,
    field,
    value,
  };
}

function invalidateProperty() {
  return {
    type: ACTION_TYPES.PROPERTY_RESET,
  };
}

function favoriteProperty(property) {
  return {
    type: ACTION_TYPES.PROPERTY_FAVORITE_REQUEST,
    params: {
      itemID: property._id,
      newItemAttributes: {
        isFavorited: !property.isFavorited,
      },
    },
  };
}

function changeListingValue(payload) {
  return {
    type: ACTION_TYPES.LISTING_CHANGE,
    payload,
  };
}

function resetFilter() {
  return {
    type: ACTION_TYPES.FILTER_RESET,
  };
}

function saveProperty() {
  return {
    type: ACTION_TYPES.PROPERTY_SAVE_REQUEST,
  };
}

export const ACTIONS = {
  fetchProperties,
  changeFormValue,
  invalidateProperty,
  favoriteProperty,
  fetchFavorites,
  changeListingValue,
  saveProperty,
  resetFilter,
};
