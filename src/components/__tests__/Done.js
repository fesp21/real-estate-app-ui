import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Done from "./../Done";

const emitter = {
  emit: jest.fn().mockReturnThis()
};

test("renders null", () => {
  const tree = renderer
    .create(<Done emitter={emitter} visible={true} title="dummy title" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("shows Hello World", () => {
  const component = renderer.create(
    <Done emitter={emitter} visible={true} title="dummy title" />
  );
  let componentJSON = component.toJSON();
  expect(componentJSON.children[0].children[0].children[0]).toBe("dummy title");
});
