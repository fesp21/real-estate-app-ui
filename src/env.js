/**
 * @flow
 */

const defaults = {
  DEFAULT_COUNTRY: 'kuwait'
};

if(__DEV__) {
  module.exports = {
    ...defaults,
    // API_URL: 'http://re.dev/api',
    API_URL: 'http://re.izal.me/api',
    GOOGLE_MAPS_KEY:'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4'
  }
} else {
  module.exports = {
    ...defaults,
    API_URL: 'http://re.com',
  }
}

