/**
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image } from 'react-native';
import colors from '../../../common/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Contact extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>

          <Text style={styles.label}>MOBILE</Text>
          <View style={styles.content}>
            <Ionicons name="md-phone-portrait" size={20} style={styles.icon} />
            <Text style={styles.name}>+96597978803</Text>
          </View>
        </View>
        <View style={styles.separator}/>

        <View style={styles.rowContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <View style={styles.content}>
            <Ionicons name="ios-mail" size={22} style={styles.icon} />
            <Text style={styles.name}>z4ls@live.com</Text>
          </View>
        </View>
        <View style={styles.separator}/>

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