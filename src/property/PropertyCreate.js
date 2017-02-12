/**
 * @flow
 */
import React, { PropTypes, Component } from "react";
import { View } from "react-native";
import List from "./components/create/List";
import AddressPicker from "./components/create/AddressPicker";
import PropertyMeta from "./components/create/PropertyMeta";
import UploadImage from "./components/create/UploadImage";
import PropertyInfo from "./components/create/PropertyInfo";
import PropertyAmenities from "./components/create/PropertyAmenities";
import NavBack from "./components/create/NavBack";
import Header from "./components/create/Header";
import Footer from "./components/create/Footer";
import get from "lodash/get";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "./common/actions";
import { SELECTORS } from "./common/selectors";
import { resolveCountryName } from './../common/functions';

class PropertyCreate extends Component {

  static propTypes = {
    listings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

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

  state = {
    stage: 1
  };

  componentWillMount() {
    this._subscription = this.props.route
      .getEventEmitter()
      .addListener("goBack", this.goToPrevStage);
  }

  componentDidUpdate() {
    const { stage } = this.state;
    this.props.navigator.updateCurrentRouteParams({
      stage: stage
    });
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  updateImage = (uploadedImages) => {
    const tempImages = this.props.listings.attributes.images;
    this.updateListing(
      "attributes",
      "images",
      tempImages.concat(uploadedImages)
    );
  };

  updateListing = (path, index, value) => {
    const { listings } = this.props;
    const payload = {
      ...listings,
      [path]: { ...listings[path], [index]: value }
    };
    this.props.actions.changeListingValue(payload);
  };

  updateMeta = (field,value) => {
    const { listings } = this.props;
    const meta = get(listings, "attributes.meta");

    let payload = {
      ...listings,
      attributes: {
        ...listings.attributes,
        meta: {
          ...listings.attributes.meta,
          [field]: value
        }
      }
    };

    this.props.actions.changeListingValue(payload);
  };

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
  };

  onValueSelect = (path, index, value) => {
    this.updateListing(path, index, value);
    this.goToNextStage();
  };

  updateAmenities = (item) => {
    const tempAmenities = this.props.listings.attributes.amenities;
    let newArray;
    if (tempAmenities.includes(item)) {
      newArray = tempAmenities.filter(amenity => amenity != item);
    } else {
      newArray = tempAmenities.concat([item]);
    }
    this.updateListing("attributes", "amenities", newArray);
  };

  goToPrevStage = () => {
    this.setState({
      stage: this.state.stage - 1
    });
  };

  goToNextStage = () => {
    return this.setState({
      stage: this.state.stage + 1
    });
  };

  saveProperty = () => {
    this.props.actions.saveProperty();
  };

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
        <AddressPicker
          path="attributes"
          index="address"
          country={country}
          stage={stage}
          header={<Header title="What city is your Apartment located in ?" />}
          category="Apartment"
          saveAddress={this.updateMap}
        />}

        {stage == 4 &&
        <PropertyMeta
          meta={listings.attributes.meta}
          filters={listings.filters}
          updateMeta={this.updateMeta}
          header={<Header title="Just a little bit more about your Apartment" />}
          footer={<Footer updateListing={this.goToNextStage} />}
        />}

        {stage == 5 &&
        <UploadImage
          images={attributes.images}
          updateImage={this.updateImage}
          header={<Header title="Upload Property Images" />}
          footer={<Footer updateListing={this.goToNextStage} />}
        />}

        {stage == 6 &&
        <PropertyInfo
          onFieldChange={this.updateListing}
          path="attributes"
          attributes={attributes}
          header={<Header title="You are almost there !!" />}
          footer={<Footer updateListing={this.goToNextStage} />}
        />}

        {stage == 7 &&
        <PropertyAmenities
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
    country: resolveCountryName(state.appReducer.country)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCreate);
