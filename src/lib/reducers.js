import { combineReducers } from 'redux';
import { appReducer } from '../modules/App/reducer';
import { propertyReducer } from '../modules/Property/reducer';
import { ormReducer } from './ormReducer';
import { authReducer } from '../modules/Auth/reducer';
import { userReducer } from '../modules/User/reducer';
import { NavigationReducer } from '@exponent/ex-navigation';

const rootReducer = combineReducers({
  navigation: NavigationReducer,
  appReducer,
  authReducer,
  propertyReducer,
  ormReducer,
  userReducer
});

export default rootReducer;
