import { API_URL } from '../../env.js';
import { fetchAPI } from '../../lib/api';

function fetchProperties(params) {
  let url = `${API_URL}/properties${params}`;;
  return fetchAPI(url);
}

function fetchFavorites(params) {
  let url = `${API_URL}/favorites${params}`;;
  return fetchAPI(url);
}

function favoriteProperty(urlParams,body) {
  let url = `${API_URL}/favorites${urlParams}`;
  return fetchAPI(url,'POST',body);
}

function saveProperty(body) {
  let url = `${API_URL}/properties`;
  return fetchAPI(url,'POST',body);
}

function uploadImage(propertyID,body) {
  let url = `${API_URL}/properties/${propertyID}/images/upload`;
  return fetchAPI(url,'POST',body,true);
}

export const API = {
  fetchProperties,
  fetchFavorites,
  favoriteProperty,
  saveProperty,
  uploadImage
};