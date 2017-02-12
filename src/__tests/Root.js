// __tests__/Intro-test.js
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Root from '../Root';
import MockStorage from '../../__tests__/helpers/MockStorage';

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage);

// Note: test renderer must be required after react-native.

test('renders Root Component', () => {
  const tree = renderer.create(
    <Root />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});