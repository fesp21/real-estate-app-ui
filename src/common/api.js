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
        "Accept": "application/json",
        "Content-Type": isBlob ? "multipart/form-data" : "application/json"
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
      return Promise.reject(`Unknown Error : ${e}`);
    });
}

export async function xhrAPI(
  url,
  body,
) {

  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.send(body);
  xhr.onreadystatechange = (e) => {
    console.log('onReady');
    if (xhr.status === 200) {
      console.log('xhr.status',xhr);
      return JSON.parse(xhr.responseText);
    } else {
      console.log('xhr.reject',xhr);
      return Promise.reject(xhr.response)
    }
  };
  console.log('ended');
  return xhr;

}



