import { createSelector } from 'reselect';
import { createSelector as ormSelector } from 'redux-orm';
import schema from '../../lib/schema';

const orm = state => state.dbReducer;
const getUserID = (state, props) => props.user._id;

const getUser = createSelector(
  orm,
  getUserID,
  ormSelector(schema, ({ User }, id) => User.withId(id).ref),
);

export const SELECTORS = {
  getUser,
};
