import { combineReducers } from 'redux';
import { appReducer } from '../bootstrap';
import { propertyReducer } from '../modules/Property/reducer';
import { ormReducer } from './ormReducer';
import { authReducer } from '../modules/Auth/reducer';
import { NavigationReducer } from '@exponent/ex-navigation';

const rootReducer = combineReducers({
  navigation: NavigationReducer,
  appReducer,
  authReducer,
  propertyReducer,
  ormReducer,
});

export default rootReducer;
