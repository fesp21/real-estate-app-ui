/**
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image } from 'react-native';
import Colors from '../../../Components/Colors';

export default class UserLogo extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (
      <View style={styles.container}>
        <Image
          source={{uri:"http://www.propertyhaat.in/images/propertyicon.png"}}
          style={styles.logo}
          />
        <Text style={styles.username}>{user.name}</Text>
      </View>

    );
  }
}

const styles =  StyleSheet.create({
  container:{
    padding:10,
    paddingVertical:20,
    backgroundColor:'white',
    alignItems:'center'
  },
  username:{
    fontSize:20,
    fontWeight:'700',
    color:Colors.darkGrey,

  },
  logo:{
    height:100,
    width:100,
  }
});