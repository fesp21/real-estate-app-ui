import { fork } from 'redux-saga/effects';
import { bootstrapMonitor, changeCountryMonitor } from '../app/common/sagas';
import { loginMonitor, logoutMonitor, registerMonitor } from '../auth/common/sagas';
import { userUpdateMonitor } from '../user/common/sagas';
import {
  propertyMonitor,
  favoriteMonitor,
  propertyFavoriteMonitor,
  propertySaveMonitor,
} from '../property/common/sagas';

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
