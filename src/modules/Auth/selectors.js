import { createSelector } from 'reselect';

const authReducer = state => state.authReducer;

const isAuthenticated = createSelector(
  authReducer,
  reducer => reducer.isAuthenticated,
);

export const SELECTORS = {
  isAuthenticated,
};
