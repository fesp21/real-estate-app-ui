/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { ScrollView, View, StyleSheet, Text, Image,ListView,TouchableHighlight,TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from './../../../../common/Colors';

export default class Stage7 extends Component {

  state = {
    descriptionHeight:40
  };

  render() {
    const {header,footer} = this.props;

    return (
      <View style={{flex:1,paddingTop:64}}>

        <ScrollView style={styles.container} contentInset={{bottom:100}}>

          {header}

          <View style={styles.menuContainer}>

            <View style={styles.row}>
              <Text style={styles.title} >Essentials</Text>
              <View style={styles.checkbox}>
                <FontAwesome name="check" size={16} color={Colors.green}/>
              </View>
            </View>
            <View style={styles.separator}/>

          </View>

        </ScrollView>

        {footer}

      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:Colors.smokeGreyLight,
  },
  menuContainer:{
    padding:10,
    paddingTop:30,
    paddingBottom:30,
    backgroundColor:'white',
  },
  row :{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  title:{
    flex:1,
    fontWeight:'100',
    color:Colors.darkGrey
  },
  separator:{
    flex:1,
    height:.5,
    backgroundColor:Colors.lightGrey,
    marginTop:10,
    marginBottom:10
  },
  checkbox:{
    width:22,
    height:22,
    borderColor:Colors.tomato,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  }

});
