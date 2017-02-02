import React, {Component, PropTypes} from "react";
import {ScrollView, View, StyleSheet, StatusBar, Text, TouchableWithoutFeedback, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "./../../../common/Colors";
import Separator from './../../../common/Separator';
import { GOOGLE_MAPS_KEY } from './../../../env.js';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class SearchScene extends Component {

  static propTypes = {
    searchString:PropTypes.string.isRequired,
    onSearch:PropTypes.func.isRequired,
    country:PropTypes.string.isRequired
  };

  render() {
    const {onSearch,searchString,country} = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={{flex:1}}>
          <View style={styles.wrapper}>
            <Ionicons name="ios-search" size={18}  color={Colors.darkGrey} style={styles.icon}/>
            <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={3}
              autoFocus={true}
              fetchDetails={true}
              renderDescription={(row) => row.terms[0].value}
              onPress={(data, details = null) => {onSearch(details.formatted_address)}}
              getDefaultValue={() => {return searchString;}}
              query={{ key: GOOGLE_MAPS_KEY, language: 'en', types: '(cities)',components:`country:${country}`}}
              styles={autoCompleteStyle}
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

const autoCompleteStyle = {
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
};

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