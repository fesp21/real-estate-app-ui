import { fork } from 'redux-saga/effects';
import { bootstrapMonitor, changeCountryMonitor } from '../modules/App/sagas';
import { loginMonitor, logoutMonitor, registerMonitor } from '../modules/Auth/sagas';
import { userUpdateMonitor } from '../modules/User/sagas';
import {
  propertyMonitor,
  favoriteMonitor,
  propertyFavoriteMonitor,
  propertySaveMonitor,
} from '../modules/Property/sagas';

export default function* rootSaga() {
  yield [
    fork(bootstrapMonitor),
    fork(changeCountryMonitor),
    fork(loginMonitor),
    fork(logoutMonitor),
    fork(registerMonitor),
    fork(propertyMonitor),
    fork(favoriteMonitor),
    fork(propertyFavoriteMonitor),
    fork(propertySaveMonitor),
    fork(userUpdateMonitor),
  ];
}
