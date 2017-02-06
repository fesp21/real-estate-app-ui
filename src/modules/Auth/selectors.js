import orm from './../../lib/orm';
import { createSelector } from 'reselect';
import { createSelector as ormSelector } from 'redux-orm';

const ormReducer = state => state.dbReducer;

const authReducer = state => state.authReducer;

const isAuthenticated = createSelector(
  authReducer,
  reducer => reducer.isAuthenticated,
);

// const fetchProperty = createSelector(
//   orm,
//   getPropertyID,
//   ormSelector(schema, ({ Property, User }, id) => {
//     const property = Property.withId(id).ref;
//     return Object.assign({}, property, { user: User.withId(property.user).ref });
//   }),
// );

const getCurrentUser = createSelector(
  ormReducer,
  authReducer,
  ormSelector(orm, ({ User }, authReducer) => {
    return null;
    // return authReducer.isAuthenticated ? User.withId(authReducer.userID).ref : null;
  }),
);

export const SELECTORS = {
  isAuthenticated,
  getCurrentUser
};
