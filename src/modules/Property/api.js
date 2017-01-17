import { API_URL } from '../../env.js';
import { fetchAPI } from '../../lib/api';
import isEmpty from 'lodash/isEmpty';

function fetchProperties(params) {
  let url = `${API_URL}/properties${params}`;;
  return fetchAPI(url);
}

function fetchFavorites(params) {
  let url = `${API_URL}/favorites${params}`;;
  return fetchAPI(url);
}

function fetchCategories(params) {
  let url = `${API_URL}/categories?${params}`;
  return fetchAPI(url);
}

function favoriteProperty(urlParams,body) {
  let url = `${API_URL}/favorites${urlParams}`;
  return fetchAPI(url,'POST',body);
}

export const API = {
  fetchProperties,
  fetchCategories,
  fetchFavorites,
  favoriteProperty
};