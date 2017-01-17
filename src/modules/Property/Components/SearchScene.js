import React, {Component, PropTypes} from "react";
import {ScrollView, View, StyleSheet, StatusBar, Text, TouchableWithoutFeedback, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "./../../../common/Colors";
import Separator from './../../../common/Separator';
import { GOOGLE_MAPS_KEY } from './../../../env.js';

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class SearchScene extends Component {

  static propTypes = {
    searchString:PropTypes.string.isRequired,
    onSearch:PropTypes.func.isRequired
  };

  render() {
    const {onSearch,searchString} = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={{flex:1}}>
          <View style={styles.wrapper}>
            <Ionicons name="ios-search" size={18}  color={Colors.darkGrey} style={styles.icon}/>
            <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={3}
              autoFocus={true}
              listViewDisplayed='auto'
              fetchDetails={true}
              renderDescription={(row) => row.terms[0].value}
              onPress={(data, details = null) => {
                onSearch(details.formatted_address)
              }}
              getDefaultValue={() => {
                return searchString; // text input default value
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
              }}
              enablePoweredByContainer={false}
              placeholderTextColor={Colors.lightGrey}
            />
          </View>
          <Separator style={{ marginTop:10,marginBottom:10 }}/>
        </View>
      </ScrollView>
    );
  }
}

const styles =  StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:'white',
    padding:10,
  },
  wrapper:{
    flexDirection:'row',
  },
  title:{
    color:'white',
    fontSize:15,
    paddingLeft:5
  },
  icon: {
    padding:5,
    paddingTop:11
  },
  text:{
    flex:1,
    marginLeft:10,
    color:Colors.darkGrey,
    fontSize:17,
    fontWeight:'500',
    height:40
  }
});