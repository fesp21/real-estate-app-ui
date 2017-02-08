import appReducer from '../app/reducer';
import propertyReducer from '../property/common/reducer';
import ormReducer from './ormReducer';
import authReducer from '../auth/reducer';
import userReducer from '../user/reducer';
import { combineReducers } from 'redux';
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
