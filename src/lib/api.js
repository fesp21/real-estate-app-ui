export function fetchAPI(url, method = 'GET', body = null, isBlob = false) {
  let requestUrl;

  if (method === 'POST') {
    requestUrl = fetch(url, {
      method,
      body: isBlob ? body : JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } else {
    requestUrl = fetch(url, {
      method,
    });
  }

  return requestUrl
    .then(response => response.json().then(json => ({
      status: response.status,
      statusType: response.statusType,
      json,
    })),
    )
    .then(({ status, statusType, json }) => {
      if (status !== 200 || !json.success) {
        const errorMsg = json.message ? json.message : (json.errors ? json.errors : statusType);
        return Promise.reject(errorMsg);
      }
      return json;
    });
}
