import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import PropertyTags from "./../PropertyTags";

test("renders heart", () => {
  const tree = renderer
    .create(<PropertyTags tags={["A", "B", "C"]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
