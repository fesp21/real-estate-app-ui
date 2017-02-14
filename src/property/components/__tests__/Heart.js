import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Heart from "./../Heart";

test("renders heart", () => {
  const tree = renderer
    .create(<Heart isFavorited={true} handleFavoritePress={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
