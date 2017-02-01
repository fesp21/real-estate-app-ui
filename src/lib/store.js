import createLogger from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';

const nextRootReducer = require('./reducers').default;

const createStoreWithNavigation = createNavigationEnabledStore({
  navigationStateKey: 'navigation',
  createStore,
});

const sagaMiddleware = createSagaMiddleware();

let Store;

if (__DEV__) {
  const logger = createLogger({
    collapsed: true,
    duration: true,
  });

  Store = createStoreWithNavigation(
    rootReducer,
    applyMiddleware(logger, sagaMiddleware),
  );

  if (module.hot) {
    module.hot.accept(() => {
      Store.replaceReducer(nextRootReducer);
    });
  }
} else {
  Store = createStoreWithNavigation(
    rootReducer,
    applyMiddleware(sagaMiddleware),
  );
}

sagaMiddleware.run(rootSaga);

export default Store;
