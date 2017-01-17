/*
 @flow
 */
import React, {Component, PropTypes} from "react";
import {
  View,
  ListView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  RefreshControl
} from "react-native";

import Separator from './../../../common/Separator';
import Colors from './../../../common/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class List extends Component {

  static propTypes = {
    title:PropTypes.string.isRequired,
    route:PropTypes.string.isRequired,
    loadEntity:PropTypes.func.isRequired,
    icon:PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {title,icon,route,loadEntity} = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={()=>loadEntity(route)} underlayColor="transparent">
          <View style={styles.rowContainer}>
            <View style={{flex:9}}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <FontAwesome
                style={styles.icon}
                name={icon}
                color={Colors.darkGrey}
                size={20}
              />
            </View>
          </View>
        </TouchableHighlight>
        <Separator style={{marginTop:20,marginBottom:20}} />
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    paddingLeft:10,
    paddingRight:10
  },
  rowContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    color:Colors.darkGrey,
    fontWeight:'200'
  },
  icon:{
    fontWeight:'100',
  }
});