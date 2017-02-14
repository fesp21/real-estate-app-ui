import { ACTION_TYPES, ACTIONS } from "../../common/actions";

describe("App Component Actions", () => {
  test("fetchProperties action", () => {
    expect(
      ACTIONS.fetchProperties({
        id: 1
      })
    ).toMatchSnapshot();
  });

  test("fetchFavorites action", () => {
    expect(
      ACTIONS.fetchFavorites({
        id: 1
      })
    ).toMatchSnapshot();
  });

  test("changeFormValue action", () => {
    expect(ACTIONS.changeFormValue("bedroom", 1)).toMatchSnapshot();
  });

  test("invalidateProperty action", () => {
    expect(ACTIONS.invalidateProperty()).toMatchSnapshot();
  });

  test("changeListingValue action", () => {
    expect(
      ACTIONS.changeListingValue("attributes", {
        title: "property title",
        address: {
          city: "Kuwait City",
          state: "Kuwait City",
          country: "Kuwait",
          latitude: 29.3667,
          longitude: 47.9667
        },
        meta: {
          bedroom: "Studio",
          bathroom: "1",
          kitchen: "1",
          area: "220.5",
          parking: "1"
        },
        images: [],
        tags: ["New", "Duplex"],
        amenities: ["Swimming Pool"]
      })
    ).toMatchSnapshot();
  });

  test("reset filter", () => {
    expect(ACTIONS.resetFilter()).toMatchSnapshot();
  });

  test("reset filter", () => {
    expect(ACTIONS.saveProperty()).toMatchSnapshot();
  });
});
