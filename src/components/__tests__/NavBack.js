import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import NavBack from "./../NavBack";

const navigator = {
  pop: jest.fn()
};

test("renders null", () => {
  const tree = renderer
    .create(<NavBack text="back" navigator={navigator} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
