// __tests__/Intro-test.js
import 'react-native';
import React from 'react';
import PropertyList from '../../../../src/property/List';
import { Provider } from 'react-redux';
import Store from '../../../../src/common/store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders PropertyList Component', () => {
  const tree = renderer.create(
    <Provider store={Store} >
      <PropertyList />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});