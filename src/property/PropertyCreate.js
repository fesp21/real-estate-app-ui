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

  componentWillMount() {
    this._subscription = this.props.route
      .getEventEmitter()
      .addListener("goBack", this.goToPrevStage);
  }

  componentDidUpdate() {
    const { stage } = this.props.listings;
    this.props.navigator.updateCurrentRouteParams({
      stage: stage
    });
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  updateAttributes = (index, value) => {
    const payload = {
      attributes:{
        [index]:value
      }
    };
    this.props.actions.changeListingValue(payload);
  };

  onSelect = (index, value) => {
    this.updateAttributes(index, value);
    this.goToNextStage();
  };

  updateMeta = (field,value) => {
    let payload = {
      [field]: value
    };
    this.updateAttributes("meta", payload);
  };

  updateAddress = (data) => {
    const { state, country, city, latitude, longitude } = data;
    const payload = {state,country,city,latitude,longitude};
    this.updateAttributes("address", payload);
  };

  updateImage = (uploadedImages) => {
    this.updateAttributes("images",uploadedImages);
  };

  updateAmenities = (item) => {
    // let newArray;
    // const amenities = this.props.listings.attributes.amenities;
    // if (amenities.includes(item)) {
    //   newArray = amenities.filter(amenity => amenity != item);
    // } else {
    //   newArray = amenities.concat([item]);
    // }
    const payload = {
      replace:true,
      key:'amenities',
      item:item
    };
    this.props.actions.changeListingValue(payload);
  };

  goToPrevStage = () => {
    const { stage } = this.props.listings;
    const payload = {stage : stage -1};
    this.props.actions.changeListingValue(payload);
  };

  goToNextStage = () => {
    const { stage } = this.props.listings;
    const payload = {stage : stage + 1};
    this.props.actions.changeListingValue(payload);
  };

  saveProperty = () => {
    this.props.actions.saveProperty();
  };

  render() {
    const { listings, types, categories, amenities, country } = this.props;
    const { attributes } = listings;
    const { stage } = listings;
    console.log('attributes',attributes);

    return (
      <View style={{ flex: 1 }}>

        {stage == 1 &&
        <List
          field="type"
          collection={types}
          header={<Header title="What type of Property you want to list ?" />}
          updateListing={this.onSelect}
        />}

        {stage == 2 &&
        <List
          field="category"
          header={<Header title="Select Category Type" />}
          collection={categories}
          updateListing={this.onSelect}
        />}

        {stage == 3 &&
        <AddressPicker
          country={country}
          stage={stage}
          address={attributes.address}
          header={<Header title="What city is your Apartment located in ?" />}
          category="Apartment"
          updateAddress={this.updateAddress}
          updateListing={this.goToNextStage}
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
          onFieldChange={this.updateAttributes}
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
