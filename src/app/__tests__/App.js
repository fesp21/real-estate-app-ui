import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { ACTION_TYPES, ACTIONS } from '../common/actions';
import appReducer from '../common/reducer';
import App from './../App';
import { Provider } from 'react-redux';
import Store from '../../common/store';

test('renders App Component', () => {
  const tree = renderer.create(
    <Provider store={Store} >
      <App
        collection={[]}
        loadEntity={()=>{}}
        onImagePress={()=>{}}
        handleFavoritePress={()=>{}}
      />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});