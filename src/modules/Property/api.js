import { API_URL } from '../../env';
import { fetchAPI } from '../../lib/api';

function fetchProperties(params) {
  const url = `${API_URL}/properties${params}`;
  return fetchAPI(url);
}

function fetchFavorites(params) {
  const url = `${API_URL}/favorites${params}`;
  return fetchAPI(url);
}

function favoriteProperty(urlParams, body) {
  const url = `${API_URL}/favorites${urlParams}`;
  return fetchAPI(url, 'POST', body);
}

function saveProperty(body) {
  const url = `${API_URL}/properties`;
  return fetchAPI(url, 'POST', body);
}

function uploadImage(propertyID, body) {
  const url = `${API_URL}/properties/${propertyID}/images/upload`;
  return fetchAPI(url, 'POST', body, true);
}

export const API = {
  fetchProperties,
  fetchFavorites,
  favoriteProperty,
  saveProperty,
  uploadImage,
};
