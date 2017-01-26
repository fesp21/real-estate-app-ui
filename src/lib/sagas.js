import { fork } from 'redux-saga/effects'
import { bootstrapMonitor,changeCountryMonitor } from '../bootstrap';
import { loginMonitor,registerMonitor } from '../modules/Auth/sagas';
import {
  propertyMonitor,
  favoriteMonitor,
  propertyFavoriteMonitor,
  saveMonitor
} from '../modules/Property/sagas';

export default function* rootSaga() {
  yield [
    fork(bootstrapMonitor),
    fork(changeCountryMonitor),
    fork(loginMonitor),
    fork(registerMonitor),
    fork(propertyMonitor),
    fork(favoriteMonitor),
    fork(propertyFavoriteMonitor),
    fork(saveMonitor),
  ]
}