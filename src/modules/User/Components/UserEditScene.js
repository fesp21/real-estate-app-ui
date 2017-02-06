/**
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, Dimensions, Image } from 'react-native';
import Colors from '../../../Components/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class UserEditScene extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired,
  };

  render() {
    const {user,loadScene} = this.props;

    const userLogo = require('./../../../../assets/login-bg.png');

    return (
      <ScrollView style={styles.container}>

        {
          !user.image ?
            <Image
              source={{uri:user.image}}
              style={styles.logo}
            />
            :
            <Image
              source={userLogo}
              style={styles.logo}
            />
        }


        <View style={styles.editIconWrapper}>
          <TouchableHighlight
            onPress={loadScene}
            underlayColor="transparent"
          >
            <FontAwesome
              name="camera"
              color={Colors.darkGrey}
              size={18}
              style={styles.editIcon}
            />
          </TouchableHighlight>

        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={user.name}
            onChange={(text)=>{}}
            placeholder="Name"
            placeholderTextColor={Colors.lightGrey}
          />

          <View style={styles.separator}/>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={user.description}
            onChange={(text)=>{}}
            multiline={true}
            placeholder="Description"
            placeholderTextColor={Colors.lightGrey}
          />
          <View style={styles.separator}/>

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={user.address}
            onChange={(text)=>{}}
            placeholder="Address"
            placeholderTextColor={Colors.lightGrey}
          />

          <View style={styles.separator}/>

        </View>

      </ScrollView>

    );
  }
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
  },
  content:{
    padding:20,
    paddingTop:50,
  },
  username:{
    fontSize:20,
    fontWeight:'700',
    color:Colors.darkGrey,
  },
  label: {
    fontSize:15,
    fontWeight:'100',
    color:Colors.smokeGreyDark
  },
  logo:{
    height:200,
    width:Dimensions.get('window').width,
  },
  editIconWrapper:{
    position:'absolute',
    top:200,
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
  },
  textInput:{
    height:30,
    fontSize:16,
    marginVertical:5,
  },
  separator:{
    marginVertical:20,
    height:.5,
    backgroundColor:Colors.smokeGreyLight
  }

});