/**
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image } from 'react-native';
import List from './../../../modules/Property/Components/PropertyList';

export default class UserSingle extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired,
  };

  render() {
    const {user,properties,loadEntity,onImagePress,handleFavoritePress,fetchProperties,isFetching} = this.props;

    return (

      <ScrollView style={styles.container}
                  showsVerticalScrollIndicator={false}
      >
        <List
          collection = {properties}
          loadEntity = {loadEntity}
          onImagePress = {onImagePress}
          handleFavoritePress = {handleFavoritePress}
          isFetching={isFetching}
          fetchProperties={fetchProperties}
          horizontal={true}
        />

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