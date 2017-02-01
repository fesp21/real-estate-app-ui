import { API_URL } from '../../env.js';
import { fetchAPI } from '../../lib/api';

function fetchUser(id, params) {
  const url = `${API_URL}/users/${id}/${params}`;
  return fetchAPI(url);
}

export const API = {
  fetchUser,
};
