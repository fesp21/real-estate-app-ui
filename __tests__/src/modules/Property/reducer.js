import {propertyReducer} from "./../../../../src/modules/Property/reducer";

const initialState = {
  isFetching:false,
  error:null,
  nextPageUrl: undefined,
  results: [],
};

const payload =
  {
    "next_page_url": null,
    "data": [
      {
        "_id": "589721ccf7415600dc786661",
      }
    ]
  };

describe('propertyReducer', () => {
  test('adds property ids to results array after fetching property', ()=> {
    expect(propertyReducer(initialState, {type: 'PROPERTY_SUCCESS',payload:payload})).toEqual({
      ...initialState,results:['589721ccf7415600dc786661'],"nextPageUrl": null
    });
  });
});
