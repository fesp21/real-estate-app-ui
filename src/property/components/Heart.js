import React, {Component, PropTypes} from "react";
import {View, StyleSheet, StatusBar, Text,TouchableHighlight} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Heart extends Component {

  static propTypes = {
    // loadFilterScene:PropTypes.func.isRequired
    handleFavoritePress:PropTypes.func.isRequired
  };

  render() {
    const {handleFavoritePress,isFavorited} = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={()=>{handleFavoritePress()}} underlayColor="transparent">
          <Icon name={isFavorited ? 'heart': 'heart-o'} size={25} style={[styles.icon]} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  container : {
    justifyContent:'flex-end',
    alignItems:'center'
  },
  title:{
    color:'white',
    fontSize:15,
    paddingLeft:5
  },
  icon: {
    width:25,
    height:25,
    color:'red',
  }
});