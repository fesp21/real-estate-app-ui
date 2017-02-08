/**
 * @flow
 */
import React, { PropTypes, Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "./common/actions";
import { SELECTORS } from "./common/selectors";
import ImagePicker from "react-native-image-crop-picker";
import List from "./components/Create/List";
import Stage3 from "./components/Create/Stage3";
import Stage4 from "./components/Create/Stage4";
import Stage5 from "./components/Create/Stage5";
import Stage6 from "./components/Create/Stage6";
import Stage7 from "./components/Create/Stage7";
import NavBack from "./components/Create/NavBack";
import Header from "./components/Create/Header";
import Footer from "./components/Create/Footer";
import get from "lodash/get";
import map from "lodash/map";

class PropertyCreate extends Component {
  static route = {
    navigationBar: {
      renderLeft: route => {
        const { config: { eventEmitter } } = route;
        return (
          <NavBack
            emitter={eventEmitter}
            stage={route.params.stage}
            icon="ios-arrow-back"
          />
        );
      }
    }
  };

  static propTypes = {
    listings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    stage: 1
  };

  componentDidUpdate() {
    const { stage } = this.state;
    this.props.navigator.updateCurrentRouteParams({
      stage: stage
    });
  }

  componentWillMount() {
    this._subscription = this.props.route
      .getEventEmitter()
      .addListener("goBack", this.goToPrevStage);
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  pickImage = () => {
    const tempImages = this.props.listings.attributes.images;
    const maxImages = 5;

    ImagePicker
      .openPicker({
        multiple: true
      })
      .then(collection => {
        return map(collection, image => image.path);
      })
      .then(images => {
        if (tempImages.length >= maxImages) return;
        let i = 1;
        let allowedImages = [];
        images.forEach(image => {
          if (i + tempImages.length <= maxImages) {
            allowedImages.push(image);
          }
          i++;
        });
        return allowedImages;
      })
      .then(pendingImages => {
        this.updateListing(
          "attributes",
          "images",
          tempImages.concat(pendingImages)
        );
      })
      .catch(e => {});
  }

  updateListing = (path, index, value) => {
    const { listings } = this.props;
    const payload = {
      ...listings,
      [path]: { ...listings[path], [index]: value }
    };
    this.props.actions.changeListingValue(payload);
  }

  updateMap = (data) => {
    const { state, country, city, latitude, longitude } = data;
    const payload = {
      state,
      country,
      city,
      latitude,
      longitude
    };
    this.updateListing("attributes", "address", payload);
    this.goToNextStage();
  }

  onValueSelect = (path, index, value) => {
    this.updateListing(path, index, value);
    this.goToNextStage();
  }

  updateAmenities = (item) => {
    const tempAmenities = this.props.listings.attributes.amenities;
    let newArray;
    if (tempAmenities.includes(item)) {
      newArray = tempAmenities.filter(amenity => amenity != item);
    } else {
      newArray = tempAmenities.concat([item]);
    }
    this.updateListing("attributes", "amenities", newArray);
  }

  goToPrevStage = () => {
    this.setState({
      stage: this.state.stage - 1
    });
  }

  goToNextStage = () => {
    return this.setState({
      stage: this.state.stage + 1
    });
  }

  onIncrementDecrement = (action, type) => {
    let arrayIndex, selectedValue;
    const { listings } = this.props;
    const { filters } = listings;
    const meta = get(listings, "attributes.meta");

    let field;
    switch (type) {
      case "bedroomsArr":
        field = "bedroom";
        break;
      case "bathroomsArr":
        field = "bathroom";
        break;
      case "parkingArr":
        field = "parking";
        break;
      default:
        break;
    }

    switch (action) {
      case "increment":
        arrayIndex = (filters[type].indexOf(meta[field]) + 1) %
          filters[type].length;
        selectedValue = filters[type][arrayIndex];
        break;
      case "decrement":
        arrayIndex = filters[type].indexOf(meta[field]);
        arrayIndex == 0 ? arrayIndex = filters[type].length : arrayIndex;
        selectedValue = filters[type][arrayIndex - 1];
    }

    let payload = {
      ...listings,
      attributes: {
        ...listings.attributes,
        meta: {
          ...listings.attributes.meta,
          [field]: selectedValue
        }
      }
    };

    this.props.actions.changeListingValue(payload);
  }

  saveProperty = () => {
    this.props.actions.saveProperty();
  }

  render() {
    const { listings, types, categories, amenities, country } = this.props;
    const { attributes } = listings;
    const { stage } = this.state;

    return (
      <View style={{ flex: 1 }}>

        {stage == 1 &&
        <List
          path="attributes"
          index="type"
          collection={types}
          header={<Header title="What type of Property you want to list ?" />}
          updateListing={this.onValueSelect}
        />}

        {stage == 2 &&
        <List
          path="attributes"
          index="category"
          header={<Header title="Select Category Type" />}
          collection={categories}
          updateListing={this.onValueSelect}
        />}

        {stage == 3 &&
        <Stage3
          path="attributes"
          index="address"
          country="KW"
          stage={stage}
          header={<Header title="What city is your Apartment located in ?" />}
          category="Apartment"
          saveAddress={this.updateMap}
        />}

        {stage == 4 &&
        <Stage4
          {...listings.attributes.meta}
          {...listings.filters}
          header={
              <Header title="Just a little bit more about your Apartment" />
            }
          footer={<Footer updateListing={this.goToNextStage} />}
          onIncrementDecrement={this.onIncrementDecrement}
        />}

        {stage == 5 &&
        <Stage5
          pickImage={this.pickImage}
          images={attributes.images}
          header={<Header title="Upload Property Images" />}
          footer={<Footer title="Save" updateListing={this.goToNextStage} />}
        />}

        {stage == 6 &&
        <Stage6
          onFieldChange={this.updateListing}
          path="attributes"
          attributes={attributes}
          header={<Header title="You are almost there !!" />}
          footer={<Footer updateListing={this.goToNextStage} />}
        />}

        {stage == 7 &&
        <Stage7
          collection={amenities}
          selected={attributes.amenities}
          updateListing={this.updateAmenities}
          header={<Header title="Select Amenities" />}
          footer={<Footer updateListing={this.saveProperty} title="Save" />}
        />}

      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) };
}

function mapStateToProps(state) {
  return {
    listings: SELECTORS.getListing(state),
    categories: SELECTORS.getCategories(state),
    types: SELECTORS.getTypes(state),
    amenities: SELECTORS.getAmenities(state),
    country: state.appReducer.country
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCreate);
