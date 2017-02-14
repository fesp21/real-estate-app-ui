import "react-native";
import React from "react";
import { AsyncStorage } from "react-native";
import renderer from "react-test-renderer";
import Root from "../Root";

jest.mock("AsyncStorage", () => AsyncStorage);

test("renders Root Component", () => {
  const tree = renderer.create(<Root />).toJSON();
  expect(tree).toMatchSnapshot();
});
