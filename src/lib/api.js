// let fetch =  require('whatwg-fetch');

export function fetchAPI(url,method = 'GET',params = null) {

  let requestUrl;

  if(method === 'POST') {
    requestUrl = fetch(url, {
      method,
      body: JSON.stringify(params),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } else {
    requestUrl = fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  return requestUrl
    .then(response => {
        return response.json().then(json => ({
          status: response.status,
          statusType: response.statusType,
          json
        }))
      }
    )
    .then(({status,statusType,json}) => {
      if(status !== 200 || !json.success) {
        let errorMsg = json.message ? json.message : ( json.errors ? json.errors : statusType);
        return Promise.reject(errorMsg);
      }
      return json;
    })
}
