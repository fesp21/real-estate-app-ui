export async function fetchAPI(
  url,
  method = "GET",
  body = null,
  isBlob = false
) {
  let request;

  if (method === "POST") {
    request = fetch(url, {
      method,
      body: isBlob ? body : JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  } else {
    request = fetch(url, {
      method
    });
  }

  return request
    .then(response => response.json().then(json => ({
      status: response.status,
      statusType: response.statusType,
      json
    })))
    .then(({ status, statusType, json }) => {
      if (status !== 200 || !json.success) {
        const unknownError = json.errors
          ? json.errors
          : `Unknown Error. Status Type : ${statusType}`;
        const errorMsg = json.message ? json.message : unknownError;
        return Promise.reject(errorMsg);
      }
      return json;
    })
    .catch(e => {
      return Promise.reject(`Unknown Error : ${e.message}`);
    });
}
