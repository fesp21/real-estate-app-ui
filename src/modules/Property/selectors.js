import { createSelector } from 'reselect';
import { createSelector as ormSelector } from 'redux-orm';
import schema from '../../lib/schema';

const propertyResults = state => state.propertyReducer.results;
const propertyIsFetching = state => state.propertyReducer.isFetching;
const propertyCategories = state => state.propertyReducer.categories;
const propertyTypes = state => state.propertyReducer.types;
const propertyFilters = state => state.propertyReducer.filters;
const propertyListings = state => state.propertyReducer.listings;
const orm = state => state.dbReducer;

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
  ormSelector(schema,({Property}) => {
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

const getCategoriesWithAny = createSelector(
  propertyCategories,
  ( categories ) => {
    return categories.concat('Any').reverse()
  }
);

const getCategories = createSelector(
  propertyCategories,
  ( categories ) => {
    return categories
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

const getListing = createSelector(
  propertyListings,
  (listings) => listings
);

const fetchComments = createSelector(
  [],
  (comments) => []
);

const getTypes = createSelector(
  propertyTypes,
  ( types ) => {
    return types
  }
);

export const SELECTORS =  {
  isFetching,
  fetchProperties,
  fetchComments,
  fetchFavorites,
  fetchProperty,
  getCategories,
  getFilters,
  getListing,
  getCategoriesWithAny,
  getTypes
};