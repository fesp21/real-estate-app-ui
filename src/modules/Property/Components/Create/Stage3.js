/**
 * @flow
 */
import React, {PropTypes, Component} from "react";
import { ScrollView,View, StyleSheet, Text, Image, ListView, TouchableHighlight,Dimensions } from "react-native";
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import MapView from 'react-native-maps';
import PriceMarker from './PriceMarker';
import Colors from "./../../../../common/Colors";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}


export default class Stage3 extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
    };

    this.onMapPress = this.onMapPress.bind(this);
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    });
  }

  render() {
    const { header,footer} = this.props;
    return (
      <View style={styles.container}>

        {header}

        <View style={styles.menuContainer}>

          <View style={styles.mapContainer}>
            <MapView
              provider={this.props.provider}
              style={styles.map}
              initialRegion={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            >
              <MapView.Marker
                coordinate={this.state.a}
                onSelect={(e) => log('onSelect', e)}
                onDrag={(e) => log('onDrag', e)}
                onDragStart={(e) => log('onDragStart', e)}
                onDragEnd={(e) => log('onDragEnd', e)}
                onPress={(e) => log('onPress', e)}
                draggable
              >
                <PriceMarker amount={99} />
              </MapView.Marker>
              <MapView.Marker
                coordinate={this.state.b}
                onSelect={(e) => log('onSelect', e)}
                onDrag={(e) => log('onDrag', e)}
                onDragStart={(e) => log('onDragStart', e)}
                onDragEnd={(e) => log('onDragEnd', e)}
                onPress={(e) => log('onPress', e)}
                draggable
              />
            </MapView>
          </View>
        </View>

        {footer}

      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    paddingTop:64,
    backgroundColor:Colors.smokeGreyLight
  },
  menuContainer:{
    flex:5,
    padding:10,
    backgroundColor:'white'
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

});
