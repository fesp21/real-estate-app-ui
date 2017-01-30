import {ACTION_TYPES} from "./actions";
import schema from "../../lib/schema";

let initialState = {
  isFetching: false,
  error: null,
  nextPageUrl:undefined,
  results:[],
};

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.USER_REQUEST :
      return {...state,isFetching:true,error:null};
    case ACTION_TYPES.USER_SUCCESS :
      return {...state,isFetching:false,error:null};
    case ACTION_TYPES.USER_FAILURE :
      return {...state,isFetching:false,error:action.error};
    default:
      return state;
  }
}

//@todo: move to separate file
export function userORM(state , action) {
  const session = schema.session(state);
  const { User } = session;
  switch (action.type) {
    default:
      break;
  }
  return session.state;
}