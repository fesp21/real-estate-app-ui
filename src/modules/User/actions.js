export const ACTION_TYPES = {
  USER_REQUEST: 'USER_REQUEST',
  USER_SUCCESS: 'USER_SUCCESS',
  USER_FAILURE: 'USER_FAILURE',
};

function fetchUser(params) {
  return {
    type: ACTION_TYPES.USER_REQUEST,
    params,
  };
}
export const ACTIONS = {
  fetchUser,
};
