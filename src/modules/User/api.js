import { API_URL } from '../../env.js';
import { fetchAPI } from '../../lib/api';

function fetchUser(id, params) {
  const url = `${API_URL}/users/${id}/${params}`;
  return fetchAPI(url);
}

function updateUser(body, urlParams) {
  const url = `${API_URL}/users/edit?${urlParams}`;
  return fetchAPI(url, 'POST', body);
}

export const API = {
  fetchUser,
  updateUser
};
