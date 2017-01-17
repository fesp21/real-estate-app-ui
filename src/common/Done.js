import React, {Component, PropTypes} from "react";
import {View, StyleSheet, StatusBar, Text,TouchableOpacity} from "react-native";
import Colors from './../common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class Done extends Component {

  handlePress(){
    this.props.emitter.emit('reset');
  };

  render() {
    const {visible} = this.props;
    if(!visible) return null;

    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={()=>this.handlePress()}>
              <Text style={styles.title}>Done</Text>
          </TouchableOpacity>
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
  },
  badgeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {
    backgroundColor: '#fff',
    height: 28,
    width: 28,
    borderRadius: 14,
    margin: 8,
    justifyContent: 'center',
  },

  badgeText: {
    backgroundColor: 'transparent',
    marginTop: -1,
    color: '#0084FF',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});