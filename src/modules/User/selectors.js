import { createSelector } from 'reselect';
import { createSelector as ormSelector } from 'redux-orm';
import orm from '../../lib/orm';

const ormReducer = state => state.dbReducer;
const getUserID = (state, props) => props.user._id;

const getUser = createSelector(
  ormReducer,
  getUserID,
  ormSelector(orm, ({ User }, id) => User.withId(id).ref),
);

export const SELECTORS = {
  getUser,
};
