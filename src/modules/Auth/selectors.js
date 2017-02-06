import orm from './../../lib/orm';
import { createSelector } from 'reselect';
import { createSelector as ormSelector } from 'redux-orm';

const ormReducer = state => state.ormReducer;
const authReducer = state => state.authReducer;

const isAuthenticated = createSelector(
  authReducer,
  reducer => reducer.isAuthenticated,
);

const getCurrentUser = createSelector(
  ormReducer,
  authReducer,
  ormSelector(orm, ({ User }, authReducer) => {
    return authReducer.isAuthenticated ? User.withId(authReducer.userID).ref : null;
  }),
);

export const SELECTORS = {
  isAuthenticated,
  getCurrentUser
};
