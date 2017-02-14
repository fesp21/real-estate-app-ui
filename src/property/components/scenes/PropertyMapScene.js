"use strict";
import React, { Component, PropTypes } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import MapView from "react-native-maps";

export default class PropertyMapScene extends Component {
  static propTypes = {
    region: PropTypes.object.isRequired,
    onRegionChange: PropTypes.func.isRequired,
    followLocation: PropTypes.func.isRequired,
    collection: PropTypes.array.isRequired
  };

  render() {
    const { collection, followLocation, region } = this.props;
    return (
      <MapView ref="map" style={styles.map} region={region}>
        {collection.map(property => {
          if (!property.address || !property.address.coord) return;
          return (
            <MapView.Marker
              ref={"ref" + property.id}
              key={"key" + property.id}
              coordinate={{
                latitude: parseFloat(property.address.coord.x),
                longitude: parseFloat(property.address.coord.y)
              }}
              title={property.title}
              description={`${property.address.street}`}
              onSelect={() => followLocation(property)}
              pinColor="blue"
            />
          );
        })}
      </MapView>
    );
  }
}

var styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "green"
  },
  getDirectionText: {
    textDecorationLine: "underline",
    paddingTop: 20,
    fontSize: 9
  },
  companyName: {
    fontSize: 9,
    padding: 5,
    color: "black",
    fontWeight: "400"
  }
});
