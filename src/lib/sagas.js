import { fork } from 'redux-saga/effects'
import { bootstrapMonitor,changeCountryMonitor } from '../bootstrap';
import { loginMonitor,registerMonitor } from '../modules/Auth/sagas';
import {
  propertyMonitor,categoryMonitor,
  favoriteMonitor,propertyFavoriteMonitor
} from '../modules/Property/sagas';

export default function* rootSaga() {
  yield [
    fork(bootstrapMonitor),
    fork(changeCountryMonitor),
    fork(loginMonitor),
    fork(registerMonitor),
    fork(propertyMonitor),
    fork(categoryMonitor),
    fork(favoriteMonitor),
    fork(propertyFavoriteMonitor),
  ]
}