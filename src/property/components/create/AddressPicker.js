/**
 * @flow
 */
import React, { PropTypes, Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Alert
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../common/colors";
import Footer from "./Footer";
import MapView from "react-native-maps";
import {
  GooglePlacesAutocomplete
} from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "./../../../env.js";
import isEmpty from "lodash/isEmpty";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.8;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class AddressPicker extends Component {
  static propTypes = {
    country: PropTypes.string.isRequired,
    updateAddress: PropTypes.func.isRequired,
    updateListing: PropTypes.func.isRequired
  };

  jumpToRegion = () => {
    const { address } = this.props;
    const closeRegion = {
      latitude: address.latitude + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
      longitude: (
        address.longitude + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2)
      )
    };
    this.map.animateToRegion(closeRegion);
  };

  onSearchPress = (locationData, locationDetails) => {
    const { updateAddress } = this.props;
    updateAddress({
      latitude: locationDetails.geometry.location.lat,
      longitude: locationDetails.geometry.location.lng,
      city: locationData.terms[0].value,
      state: locationData.terms[1].value,
      country: locationData.terms[2].value
    });
    this.jumpToRegion();
  };

  onDragEnd = e => {
    const { address, updateAddress } = this.props;
    updateAddress({
      ...address,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    });
    this.jumpToRegion();
    this.setState({
      isSelected: true
    });
  };

  updateListing = () => {
    const { address, updateListing } = this.props;
    if (isEmpty(address.country)) {
      return Alert.alert("Please Select Your Area", null);
    }
    return updateListing();
  };

  render() {
    const { header, country, address, coords } = this.props;
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.menuContainer}>
          <View style={styles.mapContainer}>

            <MapView
              ref={ref => {
                this.map = ref;
              }}
              provider={this.props.provider}
              style={styles.map}
              initialRegion={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }}
            >
              <View style={styles.textInputWrapper}>
                <GooglePlacesAutocomplete
                  placeholder="Area"
                  minLength={3}
                  fetchDetails={true}
                  renderDescription={row => row.terms[0].value}
                  onPress={(data, details = null) => {
                    this.onSearchPress(data, details);
                  }}
                  query={{
                    key: GOOGLE_MAPS_KEY,
                    language: "en",
                    types: "(cities)",
                    components: `country:${country}`
                  }}
                  styles={autoCompleteStyle}
                  enablePoweredByContainer={false}
                  placeholderTextColor={colors.lightGrey}
                  getDefaultValue={() => address.city}
                />
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => this.jumpToRegion()}
                >
                  <View style={styles.textInput}>
                    <Ionicons
                      name="ios-paper-plane"
                      color={colors.smokeGreyDark}
                      size={20}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </TouchableHighlight>

              </View>

              <MapView.Marker
                coordinate={address.latitude ? address : coords}
                onDragEnd={e => this.onDragEnd(e)}
                draggable
              />

            </MapView>
          </View>
        </View>

        <Footer updateListing={() => this.updateListing()} />

      </View>
    );
  }
}

AddressPicker.defaultProps = {
  coords: {
    latitude: 29.3667,
    longitude: 47.9667
  }
};

const autoCompleteStyle = {
  textInputContainer: {
    backgroundColor: "white",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: 0,
    height: 40
  },
  textInput: {
    color: colors.darkGrey,
    fontSize: 16,
    fontWeight: "400"
  },
  predefinedPlacesDescription: {
    color: "#1faadb"
  },
  separator: {
    height: 0.6,
    backgroundColor: "#E7E7E7"
  },
  description: {},
  row: {
    backgroundColor: "white"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: colors.smokeGreyLight
  },
  menuContainer: {
    flex: 5,
    padding: 10,
    backgroundColor: "white"
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  textInput: {
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    padding: 5,
    paddingTop: 10
  },
  textInputWrapper: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "center",
    width: 300,
    backgroundColor: "white",
    zIndex: 1000
  }
});
