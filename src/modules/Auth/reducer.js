import { ACTION_TYPES } from './actions';


const initialState = {
  isAuthenticated: false,
  token: null,
  skipped: false,
  login: {
    busy: false,
    error: null,
  },
  register: {
    busy: false,
    error: null,
  },
};

export function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST :
      return {
        ...state,
        isAuthenticated: false,
        login: { ...state.login, busy: true, error: null },
      };
    case ACTION_TYPES.LOGIN_SUCCESS :
      return {
        ...state,
        error: null,
        isAuthenticated: true,
        busy: false,
        token: action.payload.api_token,
        login: { ...state.login, busy: false, error: null },
      };
    case ACTION_TYPES.LOGIN_FAILURE :
      return {
        ...state,
        isAuthenticated: false,
        busy: false,
        token: null,
        login: { ...state.login, busy: false, error: action.error },
      };
    case ACTION_TYPES.REGISTER_REQUEST :
      return {
        ...state,
        register: { ...state.register, busy: true, error: null },
      };
    case ACTION_TYPES.REGISTER_SUCCESS :
      return {
        ...state,
        register: { ...state.register, busy: false, error: null },
      };
    case ACTION_TYPES.REGISTER_FAILURE:
      return {
        ...state,
        register: { ...state.register, busy: false, error: action.error },
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

