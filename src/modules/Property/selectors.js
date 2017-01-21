import { createSelector } from 'reselect';
import { createSelector as ormSelector } from 'redux-orm';
import orderBy from 'lodash/orderBy';

import schema from '../../lib/schema';

const propertyResults = state => state.propertyReducer.results;
const propertyIsFetching = state => state.propertyReducer.isFetching;
const propertyCategories = state => state.propertyReducer.categories;
const propertyFilters = state => state.propertyReducer.filters;
const propertyListings = state => state.propertyReducer.listings;
const orm = state => state.dbReducer;
const currentID = currentID => currentID;

const filterResults = (Property,results) => {
  return results.map((id) => Property.withId(id).ref);
  // if(filters.sortBy === 'Cheap') {
  //   return orderBy(properties,'meta.price','asc');
  // } else if(filters.sortBy === 'Pricey') {
  //   return orderBy(properties,'meta.price','desc');
  // } else if(filters.sortBy === 'Old') {
  //   return orderBy(properties,'created_at','asc');
  // } else {
  //   return orderBy(properties,'created_at','desc');
  // }
};

const fetchProperties = createSelector(
  orm,
  propertyResults,
  ormSelector(schema,({Property},results) => {
    return filterResults(Property,results);
  })
);

const fetchFavorites = createSelector(
  orm,
  propertyResults,
  ormSelector(schema,({Property},results) => {
    // favorites.filter((company)=>!company.unFavorited)
    return Property.all().toRefArray().filter((property)=> property.isFavorited).map((property)=> {
      return property;
    });
  })
);

const getPropertyID = (state,props) =>  {
  return props.property._id;
};

const fetchProperty = createSelector(
  orm,
  getPropertyID,
  ormSelector(schema,({Property},id) => {
    return Property.withId(id).ref;
  })
);

const fetchCategories = createSelector(
  propertyCategories,
  ( categories ) => {
    return categories.concat('Any').reverse()
  }
);

const isFetching = createSelector(
  propertyIsFetching,
  (isFetching) => isFetching
);

const getFilters = createSelector(
  propertyFilters,
  (filters) => filters
);
const fetchListings = createSelector(
  propertyListings,
  (listings) => listings
);

const fetchComments = createSelector(
  [],
  (comments) => []
);

export const SELECTORS =  {
  fetchProperties,
  fetchCategories,
  isFetching,
  getFilters,
  fetchComments,
  fetchFavorites,
  fetchListings,
  fetchProperty
};