// __tests__/Intro-test.js
import 'react-native';
import React from 'react';
import PropertyListScene from '../components/scenes/PropertyListScene';
import { Provider } from 'react-redux';
import Store from '../../common/store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders PropertyList Component', () => {
  const tree = renderer.create(
    <Provider store={Store} >
      <PropertyListScene
        collection={[]}
        loadEntity={()=>{}}
        onImagePress={()=>{}}
        handleFavoritePress={()=>{}}
      />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();

});