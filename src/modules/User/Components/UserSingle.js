/**
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image } from 'react-native';

export default class UserSingle extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (

      <ScrollView style={styles.container}
                  showsVerticalScrollIndicator={false}
      >

      </ScrollView>

    );
  }
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    paddingTop:64,
    width:Dimensions.get('window').width
  },
});