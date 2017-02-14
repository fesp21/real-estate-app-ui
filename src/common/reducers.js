import appReducer from "../app/common/reducer";
import propertyReducer from "../property/common/reducer";
import ormReducer from "./ormReducer";
import authReducer from "../auth/common/reducer";
import userReducer from "../user/common/reducer";
import { combineReducers } from "redux";
import { NavigationReducer } from "@exponent/ex-navigation";

const rootReducer = combineReducers({
  navigation: NavigationReducer,
  appReducer,
  authReducer,
  propertyReducer,
  ormReducer,
  userReducer
});

export default rootReducer;
