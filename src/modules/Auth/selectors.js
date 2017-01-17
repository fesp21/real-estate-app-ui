import { createSelector } from 'reselect';

const authReducer = state => state.authReducer;

const isAuthenticated = createSelector(
  authReducer,
  ( reducer ) => {
    return reducer.isAuthenticated
  }
);

export const SELECTORS =  {
  isAuthenticated,
};