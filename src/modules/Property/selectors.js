import schema from '../../lib/schema';
import { createSelector } from 'reselect';
import { createSelector as ormSelector } from 'redux-orm';

const propertyResults = state => state.propertyReducer.results;
const propertyIsFetching = state => state.propertyReducer.isFetching;
const propertyCategories = state => state.propertyReducer.categories;
const propertyTypes = state => state.propertyReducer.types;
const propertyAmenities = state => state.propertyReducer.amenities;
const propertyFilters = state => state.propertyReducer.filters;
const propertyListings = state => state.propertyReducer.listings;
const orm = state => state.dbReducer;

const filterResults = ({ Property, User }, results) => results.map((id) => {
  const property = Property.withId(id).ref;
  return Object.assign({}, property, { user: User.withId(property.user).ref });
});

const fetchProperties = createSelector(
  orm,
  propertyResults,
  ormSelector(schema, (ormSession, results) => filterResults(ormSession, results)),
);

const fetchFavorites = createSelector(
  orm,
  ormSelector(schema, ({ Property, User }) => Property.all().toRefArray().filter(property => property.isFavorited).map(property => Object.assign({}, property, { user: User.withId(property.user).ref }))),
);

const getPropertyID = (state, props) => props.property._id;

const fetchProperty = createSelector(
  orm,
  getPropertyID,
  ormSelector(schema, ({ Property, User }, id) => {
    const property = Property.withId(id).ref;
    return Object.assign({}, property, { user: User.withId(property.user).ref });
  }),
);

const getCategoriesWithAny = createSelector(
  propertyCategories,
  categories => categories.concat('Any').reverse(),
);

const getCategories = createSelector(
  propertyCategories,
  categories => categories,
);

const isFetching = createSelector(
  propertyIsFetching,
  isFetching => isFetching,
);

const getFilters = createSelector(
  propertyFilters,
  filters => filters,
);

const getListing = createSelector(
  propertyListings,
  listings => listings,
);

const fetchComments = createSelector(
  [],
  comments => [],
);

const getTypes = createSelector(
  propertyTypes,
  types => types,
);

const getAmenities = createSelector(
  propertyAmenities,
  amenities => amenities,
);

export const SELECTORS = {
  isFetching,
  fetchProperties,
  fetchComments,
  fetchFavorites,
  fetchProperty,
  getCategories,
  getFilters,
  getListing,
  getCategoriesWithAny,
  getTypes,
  getAmenities,
};
