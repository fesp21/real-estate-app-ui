/**
 * @flow
 */

const defaults = {
  DEFAULT_COUNTRY: "kuwait"
};

if (__DEV__) {
  module.exports = {
    ...defaults,
    // API_URL: "http://re.dev/api",
    API_URL: 'http://re.izal.me/api',
    GOOGLE_MAPS_KEY: "AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4",
    GOOGLE_MAPS_IOS_KEY: "AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo",
    GOOGLE_MAPS_ANDROID_KEY: "AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4",
    CODEPUSH_ENABLED: true
  };
  // XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
} else {
  module.exports = {
    ...defaults,
    API_URL: "http://re.izal.me/api",
    GOOGLE_MAPS_KEY: "AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4",
    GOOGLE_MAPS_IOS_KEY: "AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo",
    GOOGLE_MAPS_ANDROID_KEY: "AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4",
    CODEPUSH_ENABLED: true
  };
}
