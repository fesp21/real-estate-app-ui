import { createSelector } from 'reselect';
import { createSelector as ormSelector } from 'redux-orm';
import schema from '../../lib/schema';

const orm = state => state.dbReducer;
const propertyResults = state => state.propertyReducer.results;

const getUserID = (state,props) =>  {
  return props.user._id;
};

const getUser = createSelector(
  orm,
  getUserID,
  ormSelector(schema,({User},id) => {
    return User.withId(id).ref;
  })
);

const filterResults = ({Property,User},results) => {
  return results.map((id) => {
    const property = Property.withId(id).ref;
    return Object.assign({},property,{user:User.withId(property.user).ref});
  });
};

const fetchProperties = createSelector(
  orm,
  propertyResults,
  ormSelector(schema,(ormSelector,results) => {
    return filterResults(ormSelector,results);
  })
);


export const SELECTORS =  {
  getUser,
  fetchProperties
};