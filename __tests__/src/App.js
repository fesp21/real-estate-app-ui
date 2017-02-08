import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { ACTION_TYPES, ACTIONS } from './../../src/modules/App/actions';
import { appReducer } from './../../src/modules/App/reducer';

describe('App Component Actions', () => {

  test('returns expected action', () => {

    const expected = {
      type: ACTION_TYPES.BOOT_REQUEST
    };

    const actual = ACTIONS.boot();
    expect(actual).toEqual(expected);
  });

});


describe('App Component Store', () => {

  const initialState = {
      bootstrapped : false,
      country: 'Kuwait'
  };

  test('should return the initial state', () => {
    expect(
      appReducer(initialState, {type:'UNDEFINED'})
    ).toEqual(initialState)
  })

});