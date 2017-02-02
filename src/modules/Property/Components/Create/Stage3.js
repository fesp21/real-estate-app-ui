/**
 * @flow
 */
import React, {PropTypes, Component} from "react";
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

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import MapView, {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from "react-native-maps";
import PriceMarker from "./PriceMarker";
import {GOOGLE_MAPS_KEY} from "./../../../../env.js";
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 29.3667;
const LONGITUDE = 47.9667;
const LATITUDE_DELTA = .8;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
const SPACE = 0.01;

import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "./../../../../common/Colors";


function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

export default class Stage3 extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      locationSearchingString:'',
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
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

  jumpToRegion = () => {
    this.map.animateToRegion(this.randomRegion());
  };

  randomRegion() {
    const { region } = this.state;
    return {
      ...this.state.region,
      latitude: region.latitude + ((Math.random() - 0.5) * (region.latitudeDelta / 2)),
      longitude: region.longitude + ((Math.random() - 0.5) * (region.longitudeDelta / 2)),
    };
  }

  onSearch = (locationDetails) => {
    this.setState({
      // locationSearchingString:location,
      region : {
        ...this.state.region,
        latitude:locationDetails.geometry.location.lat,
        longitude:locationDetails.geometry.location.lng,
      }
    })
    this.jumpToRegion();
  };

  render() {
    const { header,footer} = this.props;
    const { locationSearchingString}  = this.state;
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.menuContainer}>
          <View style={styles.mapContainer}>

            <MapView
              ref={ref => { this.map = ref; }}
              provider={this.props.provider}
              style={styles.map}
              initialRegion={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            >
              <View style={{marginTop:10,flexDirection:'row',alignSelf:'center',width:300,backgroundColor:'white',zindex:1000}}>
                <GooglePlacesAutocomplete
                  placeholder='Search'
                  minLength={3}
                  autoFocus={true}
                  listViewDisplayed='auto'
                  fetchDetails={true}
                  renderDescription={(row) => row.terms[0].value}
                  onPress={(data, details = null) => {
                    console.log('data',data);
                    console.log('details',details);
                    this.onSearch(details);
                  }}
                  getDefaultValue={() => {
                    return locationSearchingString; // text input default value
                  }}
                  query={{
                    key: GOOGLE_MAPS_KEY,
                    language: 'en',
                    types: '(cities)',
                  }}
                  styles={{
                    textInputContainer: {
                      backgroundColor: 'white',
                      borderTopWidth: 0,
                      borderBottomWidth:0,
                      padding:0,
                      margin:0,
                      height:40
                    },
                    textInput: {
                      color:Colors.darkGrey,
                      fontSize:16,
                      fontWeight:'400',
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb'
                    },
                    separator: {
                      height:.6,
                      backgroundColor:'#E7E7E7'
                    },
                    description:{
                    },
                    row:{
                      backgroundColor:'white'
                    }
                  }}
                  enablePoweredByContainer={false}
                  placeholderTextColor={Colors.lightGrey}
                />
                <TouchableHighlight underlayColor="transparent" onPress={() => this.jumpToRegion()}>
                  <View style={{height:40,backgroundColor:'white',alignItems:'center',padding:5,paddingTop:10}}>
                    <Ionicons name="ios-paper-plane" color={Colors.smokeGreyDark} size={20} style={{ width:20,height:20}}/>
                  </View>
                </TouchableHighlight>

              </View>



              <MapView.Marker
                coordinate={this.state.region}
                onSelect={(e) => log('onSelect', e)}
                onDrag={(e) => log('onDrag', e)}
                onDragStart={(e) => log('onDragStart', e)}
                onDragEnd={(e) => log('onDragEnd', e)}
                onPress={(e) => log('onPress', e)}
                draggable
              >
              </MapView.Marker>

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
