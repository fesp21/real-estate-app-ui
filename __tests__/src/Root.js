// __tests__/Intro-test.js
import 'react-native';
import React from 'react';
import Root from '../../src/Root';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders Root Component', () => {
  const tree = renderer.create(
    <Root />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});