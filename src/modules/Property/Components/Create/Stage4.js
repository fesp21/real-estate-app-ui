/**
 * @flow
 */
import React, {PropTypes, Component} from "react";
import {ScrollView,View, StyleSheet, Text, Image, ListView, TouchableHighlight,Dimensions} from "react-native";
import Colors from "./../../../../common/Colors";
import Button from './../Filters/Button';

export default class Stage4 extends Component {

  static propTypes = {
  };

  onIncrement() {
  }

  onDecrement() {
  }

  render() {
    const {bedroomsArr,bathroomsArr,parkingArr,header, footer} = this.props;

    return (
      <View style={styles.container}>

        {header}

        <View style={styles.menuContainer}>

          <Button title="Bed"
                  type="bedroomsArr"
                  icon ="bed"
                  incrementText = "+"
                  decrementText = "-"
                  onIncrement = {this.onIncrement}
                  onDecrement = {this.onDecrement}
                  titleStyle={{}}
                  ranges={bedroomsArr}
                  selected = {bedroomsArr[0]}
                  style = {{
                    height:40,
                    backgroundColor:Colors.lightGrey
                  }}
          />

          <View style={[styles.separator,{marginTop:10,marginBottom:10}]}/>
          <Button title="Bath"
                  type="bathroomsArr"
                  icon ="bath"
                  incrementText = "+"
                  decrementText = "-"
                  onIncrement = {this.onIncrement}
                  onDecrement = {this.onDecrement}
                  titleStyle={{}}
                  ranges={bathroomsArr}
                  selected = {bathroomsArr[0]}
                  style = {{
                    height:40,
                    backgroundColor:Colors.lightGrey
                  }}
          />

          <View style={[styles.separator,{marginTop:10,marginBottom:10}]}/>
          <Button title="Parking"
                  type="parkingArr"
                  icon ="car"
                  incrementText = "+"
                  decrementText = "-"
                  onIncrement = {this.onIncrement}
                  onDecrement = {this.onDecrement}
                  titleStyle={{}}
                  ranges={parkingArr}
                  selected = {parkingArr[0]}
                  style = {{
                    height:40,
                    backgroundColor:Colors.lightGrey
                  }}
          />

        </View>

        {footer}

      </View>
    )

  }
}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    paddingTop:64,
    backgroundColor:Colors.smokeGreyLight,
    paddingBottom:56
  },
  menuContainer:{
    flex:2,
    padding:10,
    backgroundColor:'white'
  },
  separator:{
    backgroundColor:Colors.lightGrey,
    height:.5
  },
});
