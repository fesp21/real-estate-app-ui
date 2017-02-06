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

    return (
      <View style={styles.container}>

        <Image
          source={{uri:user.image}}
          style={styles.logo}
        />

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
          />

          <View style={styles.separator}/>

          {
            user.isCompany &&
            <View style={{flex:1}}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textInput}
                defaultValue={user.description}
                onChange={(text)=>{}}
                multiline={true}
              />
              <View style={styles.separator}/>
            </View>
          }

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={user.address}
            onChange={(text)=>{}}
          />

          <View style={styles.separator}/>

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
  },
  textInput:{
    height:30,
    fontSize:16,
    marginVertical:5,
  },
  separator:{
    marginVertical:10,
    height:.5,
    backgroundColor:Colors.smokeGreyLight
  }

});