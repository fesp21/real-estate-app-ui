import appReducer from '../../common/reducer';
import { ACTION_TYPES } from '../../common/actions';

describe('App Component Store', () => {

  const initialState = {
    bootstrapped : false,
    country: 'Kuwait'
  };

  test('should return the initial state', () => {
    expect(
      appReducer(initialState, {type:'UNDEFINED'})
    ).toEqual(initialState)
  });

  test('app bootstraps', () => {
    expect(
      appReducer(initialState,{type:ACTION_TYPES.BOOT_SUCCESS})
    ).toEqual({
      bootstrapped:true,
      country: 'Kuwait'
    })
  });

  test('should change country', () => {
    expect(
      appReducer(initialState,{type:ACTION_TYPES.COUNTRY_CHANGED,country:'UAE'})
    ).toEqual({
      bootstrapped:false,
      country: 'UAE'
    })
  });

})