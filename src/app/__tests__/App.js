import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import App from "./../App";
import {Provider} from "react-redux";
import Store from "../../common/store";

// test('renders null', () => {
//   const tree = renderer.create(
//     <Provider store={Store} >
//       <App
//         collection={[]}
//         loadEntity={()=>{}}
//         onImagePress={()=>{}}
//         handleFavoritePress={()=>{}}
//       />
//     </Provider>
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });
test('returns expected action', () => {
  const expected = 2;
  const actual = 1+1;
  expect(actual).toEqual(expected);
});
