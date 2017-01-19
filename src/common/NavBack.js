import React, {Component, PropTypes} from "react";
import {View, StyleSheet, StatusBar, Text,TouchableHighlight} from "react-native";
import Colors from './../common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  withNavigation,
} from '@exponent/ex-navigation';

@withNavigation
export default class NavBack extends Component {

  static propTypes = {
    // style:PropTypes.node,
    text:PropTypes.string,
    navigator:PropTypes.object.isRequired,
    icon:PropTypes.string
  };

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    const {style,text,icon} = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={()=>{this.goBack()}} underlayColor="transparent">
            {icon ? <Ionicons name={icon} size={30} color="#2c2d30" style={[styles.icon]}/> : <Text style={[styles.title,style]}>{text}</Text> }
        </TouchableHighlight>
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:15,
    paddingRight:10
  },
  title:{
    color:Colors.tomato,
    fontSize:15,
  },
  icon: {
    width:30,
    height:30,
    alignSelf:'center',
    color:Colors.tomato,
  }
});