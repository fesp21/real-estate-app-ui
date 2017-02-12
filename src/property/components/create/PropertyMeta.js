/**
 * @flow
 */
import React, {PropTypes, Component} from "react";
import {ScrollView, View, StyleSheet, Text, Image, ListView, TouchableHighlight, Dimensions} from "react-native";
import colors from "../../../common/colors";
import Button from "../filters/Button";

export default class PropertyMeta extends Component {

  static propTypes = {
    updateMeta:PropTypes.func.isRequired,
    filters:PropTypes.object.isRequired,
    meta:PropTypes.object.isRequired
  };

  render() {
    const {header, footer, updateMeta} = this.props;
    const {bedroom,bathroom,parking} = this.props.meta;
    const {bedroomsArr,bathroomsArr,parkingArr} = this.props.filters;
    return (
      <View style={styles.container}>

        {header}

        <View style={styles.menuContainer}>

          <Button title="Bed"
                  icon ="bed"
                  incrementText = "+"
                  decrementText = "-"
                  onPress = {(value)=>updateMeta('bedroom',value)}
                  range={bedroomsArr}
                  selected = {bedroom}
                  style = {{
                    height:40,
                    backgroundColor:colors.lightGrey
                  }}
          />

          <View style={[styles.separator,{marginTop:10,marginBottom:10}]}/>
          <Button title="Bath"
                  icon ="bath"
                  incrementText = "+"
                  decrementText = "-"
                  onPress = {(value)=>updateMeta('bathroom',value)}
                  range={bathroomsArr}
                  selected = {bathroom}
                  style = {{
                    height:40,
                    backgroundColor:colors.lightGrey
                  }}
          />

          <View style={[styles.separator,{marginTop:10,marginBottom:10}]}/>
          <Button title="Parking"
                  icon ="car"
                  incrementText = "+"
                  decrementText = "-"
                  onPress = {(value)=>updateMeta('parking',value)}
                  range={parkingArr}
                  selected = {parking}
                  style = {{
                    height:40,
                    backgroundColor:colors.lightGrey
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
    backgroundColor:colors.smokeGreyLight,
    paddingBottom:56
  },
  menuContainer:{
    flex:2,
    padding:10,
    backgroundColor:'white'
  },
  separator:{
    backgroundColor:colors.lightGrey,
    height:.5
  },
});
