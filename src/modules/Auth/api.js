import { API_URL } from '../../env.js';
import { fetchAPI } from '../../lib/api';
import isNull from 'lodash/isNull';

export const AUTH_STORAGE_KEY = 'AUTH_TOKEN_!@###';

function login(params, token) {
  if (isNull(token) && isNull(params)) return;
  const url = isNull(token) ? `${API_URL}/auth/login` : `${API_URL}/auth/login?api_token=${token}`;
  return fetchAPI(url, 'POST', params);
}

function register(params) {
  const url = `${API_URL}/auth/register`;
  return fetchAPI(url, 'POST', params);
}

export const API = {
  login,
  register,
};
