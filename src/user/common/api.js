import { API_URL } from "../../env.js";
import { fetchAPI, xhrAPI } from "../../common/api";

function fetchUser(id, params) {
  const url = `${API_URL}/users/${id}/${params}`;
  return fetchAPI(url);
}

function updateUser(body, urlParams) {
  const url = `${API_URL}/users/edit?${urlParams}`;
  return fetchAPI(url, "POST", body);
}

function uploadImage(body, urlParams) {
  const url = `${API_URL}/users/image/upload?${urlParams}`;
  return xhrAPI(url, body);
}

export const API = {
  fetchUser,
  updateUser,
  uploadImage
};
