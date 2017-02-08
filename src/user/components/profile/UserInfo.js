/**
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image } from 'react-native';
import colors from '../../../common/colors';

export default class UserInfo extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>

          <Text style={styles.description}>
            Kuwait Real Estate Company (AQARAT) is one of Kuwaits leading real estate companies, with several firsts to its credit. It was the first real estate company to be incorporated into the Kuwait Stock Exchange, the first to develop mixed-use retail, office and car park in Kuwait, and the first to introduce the Build-Operate-Transfer concept before a formal regulation was adopted.
AQARAT has a remarkable presence in Kuwait; it owns, develops and manages many prominent, historical and legendary buildings in Kuwait. AQARAT global footprint spans notable projects in MENA, GCC, Europe, and US where it is known for its ultra luxurious residential hubs and investment units.
AQARAT has implemented a diversified strategy in the real estate and investment sector. The focus is two-fold: to deliver superior value to its customers through innovation & uniqueness and to become a world leader by establishing and consolidating its presence in leading real estate markets across the globe.
The company continues to successfully implement its strategic vision by evaluating the potential of new & emerging markets, investing in prestigious projects and diversifying its scope of operations, all the while maintaining superior quality, unyielding technical standards and excellence.
AQARAT has also entered into strategic alliances and joint venture partnerships with leading local, regional and international companies such as Yotel New York, IFA Hotels & Resorts, UAE and Courtyard by Marriot, Hamburg, Germany.

          </Text>
          <View style={styles.separator}/>
        </View>
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor:'white',
    paddingTop:20
  },
  description:{
    fontWeight:'100',
    color:colors.darkGrey,
    fontSize:15
  },
  content:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  name:{
    fontSize:16,
    fontWeight:'100',
    color:colors.darkGrey,
  },
  label:{
    paddingBottom:5,
    color:colors.smokeGreyLight
  },
  icon:{
    width:20,
    height:20
  },
  separator:{
    marginVertical:20,
    height:.5,
    backgroundColor:colors.smokeGreyLight
  }
});