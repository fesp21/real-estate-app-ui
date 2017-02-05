// __tests__/Intro-test.js
import 'react-native';
import React from 'react';
import App from '../../src/App';
import { Provider } from 'react-redux';
import Store from './../../src/lib/store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders App Component', () => {
  const tree = renderer.create(

    <Provider store={Store} >
      <App />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});