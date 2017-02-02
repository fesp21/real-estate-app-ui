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
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "./../../../../common/Colors";
import Footer from "./Footer";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import {
  GooglePlacesAutocomplete
} from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "./../../../../env.js";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 29.3667;
const LONGITUDE = 47.9667;
const LATITUDE_DELTA = 0.8;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Stage3 extends Component {
  static propTypes = {
    country: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      address: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        city: "",
        state: ""
      }
    };
  }

  jumpToRegion = () => {
    this.map.animateToRegion(this.randomRegion());
  };

  randomRegion() {
    const { address } = this.state;
    return {
      ...this.state.address,
      latitude: address.latitude + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
      longitude: (
        address.longitude + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2)
      )
    };
  }

  handleSearch = (locationData, locationDetails) => {
    this.setState({
      // locationSearchingString:location,
      address: {
        ...this.state.address,
        latitude: locationDetails.geometry.location.lat,
        longitude: locationDetails.geometry.location.lng,
        city: locationData.terms[0].value,
        state: locationData.terms[1].value,
        country: locationData.terms[2].value
      }
    });
    this.jumpToRegion();
  };

  onDragEnd = (e) => {
    this.setState({
      address: {
        ...this.state.address,
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      }
    });
    this.jumpToRegion();
  };

  render() {
    const { header, country, saveAddress } = this.props;
    const { address } = this.state;

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
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }}
            >
              <View
                style={styles.textInputWrapper}
              >
                <GooglePlacesAutocomplete
                  placeholder="Search"
                  minLength={3}
                  fetchDetails={true}
                  renderDescription={row => row.terms[0].value}
                  onPress={(data, details = null) => {
                    this.handleSearch(data, details);
                  }}
                  query={{
                    key: GOOGLE_MAPS_KEY,
                    language: "en",
                    types: "(cities)",
                    components: `country:${country}`
                  }}
                  styles={autoCompleteStyle}
                  enablePoweredByContainer={false}
                  placeholderTextColor={Colors.lightGrey}
                />
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => this.jumpToRegion()}
                >
                  <View
                    style={styles.textInput}
                  >
                    <Ionicons
                      name="ios-paper-plane"
                      color={Colors.smokeGreyDark}
                      size={20}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </TouchableHighlight>

              </View>

              <MapView.Marker
                coordinate={this.state.address}
                onDragEnd={e => this.onDragEnd(e)}
                draggable
              />

            </MapView>
          </View>
        </View>

        <Footer updateListing={() => saveAddress(address)} />

      </View>
    );
  }
}

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
    color: Colors.darkGrey,
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
    backgroundColor: Colors.smokeGreyLight
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
  textInput:{
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    padding: 5,
    paddingTop: 10
  },
  textInputWrapper:{
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "center",
    width: 300,
    backgroundColor: "white",
    zIndex: 1000
  },
});

