import union from "lodash/union";
import map from "lodash/map";
import { ACTION_TYPES } from "./actions";
import merge from "lodash/merge";
import isArray from "lodash/isArray";

const initialState = {
  isFetching: false,
  categories: ["Villa", "Apartment", "Chalet"],
  amenities: ["Swimming Pool", "Ocean View", "Sauna"],
  types: ["For Sale", "For Rent"],
  error: null,
  nextPageUrl: undefined,
  nextPageFavoritesUrl: undefined,
  results: [],
  filters: {
    priceFromArr: [
      "Any",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900"
    ],
    priceToArr: [
      "Any",
      "250",
      "350",
      "450",
      "550",
      "650",
      "750",
      "850",
      "1000"
    ],
    bedroomsArr: ["Any", "Studio", "1", "1+", "2", "2+", "3", "3+", "4", "4+"],
    bathroomsArr: ["Any", "1", "1+", "2", "2+", "3", "3+", "4", "4+"],
    parkingArr: ["Any", "1", "1+", "2", "2+", "3", "3+", "4", "4+"],
    priceFrom: "Any",
    priceTo: "Any",
    parking: "Any",
    bedroom: "Any",
    bathroom: "Any",
    category: "Any",
    sortOptions: ["New", "Cheap", "Pricey", "Old"],
    sortBy: "New",
    searchString: ""
  },
  listings: {
    filters: {
      bedroomsArr: ["Studio", "1", "2", "3", "4", "5", "6", "7", "7+"],
      bathroomsArr: ["1", "2", "3", "4", "5", "6", "7", "7+"],
      parkingArr: ["N/A", "1", "2", "3", "4", "4+"]
    },
    done: false,
    stage: 1,
    attributes: {
      type: "For Sale",
      category: "Villa",
      title: "3 bedrooms apartment in Jabriya",
      description: "Beautiful new apartment from rent in Jabriya near McDonalds",
      price: "200",
      address: {
        city: "Kuwait City",
        state: "Kuwait City",
        country: "Kuwait",
        latitude: 29.3667,
        longitude: 47.9667
      },
      meta: {
        bedroom: "Studio",
        bathroom: "1",
        kitchen: "1",
        area: "220.5",
        parking: "1"
      },
      images: [
        // "/Users/ZaL/Library/Developer/CoreSimulator/Devices/EA84BF0A-FB05-4E60-97DD-B83C0C40B7B7/data/Containers/Data/Application/0203C691-DEE0-40D6-A897-DB81D337F0B0/tmp/react-native-image-crop-picker/EB145D8D-D812-4C8C-926B-C449F5F0EF98.jpg"
      ],
      video: null,
      amenities: ["Swimming Pool"]
    }
  }
};

export default function propertyReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.PROPERTY_REQUEST:
      return { ...state, isFetching: true, error: null };
    case ACTION_TYPES.PROPERTY_SUCCESS:
      const results = [];
      const propertyCollections = action.payload.data;
      map(propertyCollections, entity => {
        results.push(entity._id);
      });
      return {
        ...state,
        isFetching: false,
        error: null,
        results: union(state.results, results),
        nextPageUrl: action.payload.next_page_url
      };
    case ACTION_TYPES.PROPERTY_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    case ACTION_TYPES.PROPERTY_RESET:
      return { ...state, results: [], nextPageUrl: undefined };
    case ACTION_TYPES.FILTER_CHANGE:
      return {
        ...state,
        filters: { ...state.filters, [action.field]: action.value }
      };
    case ACTION_TYPES.FILTER_RESET:
      return { ...state };
    case ACTION_TYPES.FAVORITES_SUCCESS:
      const favoriteResults = [];
      const favoritePropertyCollections = action.payload.data;
      map(favoritePropertyCollections, entity => {
        favoriteResults.push(entity._id);
      });
      return {
        ...state,
        nextPageFavoritesUrl: action.payload.next_page_url,
        results: union(state.results, favoriteResults)
      };
    case ACTION_TYPES.FAVORITES_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    case ACTION_TYPES.LISTING_UPDATE_ITEM:
      if (action.payload.replace) {
        const { key, item } = action.payload;
        const oldState = state.listings.attributes[key];
        let newState;

        if (isArray(item)) {
          newState = union(oldState, item);
        } else {
          if (oldState.includes(item)) {
            // remove item
            newState = oldState.filter(value => value != item);
          } else {
            newState = union(oldState, [item]);
          }
        }

        return {
          ...state,
          listings: {
            ...state.listings,
            attributes: {
              ...state.listings.attributes,
              [key]: newState
            }
          }
        };
      }

      return {
        ...state,
        listings: merge({}, state.listings, action.payload)
      };

    default:
      return state;
  }
}
