import { ACTION_TYPES } from './actions';

export const COUNTRY_KEY = 'COUNTRY';
const DEFAULT_COUNTRY = 'Kuwait';

// // reducer
const initialState = {
  bootstrapped: false,
  country: DEFAULT_COUNTRY,
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.BOOT_REQUEST :
      return { ...state, bootstrapped: false };
    case ACTION_TYPES.BOOT_SUCCESS :
      return { ...state, bootstrapped: true };
    case ACTION_TYPES.COUNTRY_CHANGED :
      return { ...state, country: action.country };
    default:
      return state;
  }
}
