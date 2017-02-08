/**
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image } from 'react-native';
import colors from '../../../common/colors';

export default class UserLogo extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (
      <View style={styles.container}>
        {
          user.image ?
            <Image
              source={{uri:user.image}}
              style={styles.logo}
              resizeMode="cover"
            />
            :
            <FontAwesome
              name="picture-o"
              color="white"
              size={200}
              style={styles.emptyImageIcon}
            />
        }
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
    color:colors.darkGrey,
    paddingTop:20,
  },
  logo:{
    height:80,
    width:80,
    borderRadius:40
  }
});