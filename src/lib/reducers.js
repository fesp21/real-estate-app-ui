import { combineReducers } from 'redux';
import { appReducer } from '../bootstrap';
import { propertyReducer, dbReducer } from '../modules/Property/reducer';
import { authReducer } from '../modules/Auth/reducer';
import { NavigationReducer } from '@exponent/ex-navigation';

const rootReducer = combineReducers({
  navigation: NavigationReducer,
  appReducer,
  authReducer,
  propertyReducer,
  dbReducer,
});

export default rootReducer;
