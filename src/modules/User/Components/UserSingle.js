/**
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image } from 'react-native';
import Colors from '../../../Components/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class UserSingle extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired,
  };

  render() {
    const {user,loadScene} = this.props;

    return (
      <View style={styles.container}>

        <Image
          source={{uri:"http://www.propertyhaat.in/images/propertyicon.png"}}
          style={styles.logo}
        />

        <View style={styles.editIconWrapper}>
          <TouchableHighlight
            onPress={loadScene}
            underlayColor="transparent"
          >
            <FontAwesome
              name="pencil"
              color={Colors.darkGrey}
              size={18}
              style={styles.editIcon}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.date}>Member Since May 2015</Text>
        </View>

      </View>

    );
  }
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
  },
  content:{
    padding:20,
  },
  username:{
    fontSize:20,
    fontWeight:'700',
    color:Colors.darkGrey,
  },
  date: {
    paddingVertical:10,
    fontSize:15,
    fontWeight:'100',
    color:Colors.smokeGreyDark
  },
  logo:{
    height:150,
    width:Dimensions.get('window').width,
  },
  editIconWrapper:{
    position:'absolute',
    top:150,
    right:15,
    marginTop:-20,
    height:40,
    width:40,
    borderRadius:20,
    zIndex:1000,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:Colors.smokeGreyDark,
    shadowOpacity:0.6,
    shadowOffset:{width:1,height:1}
  }
});