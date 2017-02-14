/*
 @flow
 */
import React, { Component, PropTypes } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import MapView from "react-native-maps";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.8;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class PropertyMap extends Component {
  static propTypes = {
    followLocation: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired
  };

  render() {
    const { address, followLocation } = this.props;
    const { latitude, longitude } = address;
    return (
      <MapView
        ref={ref => {
          this.map = ref;
        }}
        provider={this.props.provider}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
      >
        <MapView.Marker
          coordinate={address}
          onSelect={() => followLocation()}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    marginVertical: 5,
    height: 250,
    alignItems: "center"
  }
});
