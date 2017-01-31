/**
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image } from 'react-native';
import Colors from './../../../common/Colors';

export default class UserInfo extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (

      <View style={styles.container}>
        <Text style={styles.username}>{user.name}</Text>
      </View>

    );
  }
}

const styles =  StyleSheet.create({
  container:{
    paddingTop:30,
    backgroundColor:'white',
  },
  username:{
    fontSize:20,
    fontWeight:'700',
    color:Colors.darkGrey,
    textAlign:'center'
  }
});