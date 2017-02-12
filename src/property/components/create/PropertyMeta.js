/**
 * @flow
 */
import React, {PropTypes, Component} from "react";
import {ScrollView,View, StyleSheet, Text, Image, ListView, TouchableHighlight,Dimensions} from "react-native";
import colors from "../../../common/colors";
import Button from '../filters/Button';

export default class PropertyMeta extends Component {

  static propTypes = {
    updateMeta:PropTypes.func.isRequired,
    filters:PropTypes.object.isRequired,
    meta:PropTypes.object.isRequired
  };

  updateMeta = (action,type) => {
    let arrayIndex, selectedValue;
    const { filters,meta } = this.props;

    let field;
    switch (type) {
      case "bedroomsArr":
        field = "bedroom";
        break;
      case "bathroomsArr":
        field = "bathroom";
        break;
      case "parkingArr":
        field = "parking";
        break;
      default:
        break;
    }

    switch (action) {
      case "increment":
        arrayIndex = (filters[type].indexOf(meta[field]) + 1) %
          filters[type].length;
        selectedValue = filters[type][arrayIndex];
        break;
      case "decrement":
        arrayIndex = filters[type].indexOf(meta[field]);
        arrayIndex == 0 ? arrayIndex = filters[type].length : arrayIndex;
        selectedValue = filters[type][arrayIndex - 1];
    }

    this.props.updateMeta(field,selectedValue);
  };

  render() {
    const {header, footer,onIncrementDecrement} = this.props;
    const {bedroom,bathroom,parking} = this.props.meta;
    const {bedroomsArr,bathroomsArr,parkingArr} = this.props.filters;
    return (
      <View style={styles.container}>

        {header}

        <View style={styles.menuContainer}>

          <Button title="Bed"
                  type="bedroomsArr"
                  icon ="bed"
                  incrementText = "+"
                  decrementText = "-"
                  onIncrementDecrement = {this.updateMeta}
                  titleStyle={{}}
                  ranges={bedroomsArr}
                  selected = {bedroom}
                  style = {{
                    height:40,
                    backgroundColor:colors.lightGrey
                  }}
          />

          <View style={[styles.separator,{marginTop:10,marginBottom:10}]}/>
          <Button title="Bath"
                  type="bathroomsArr"
                  icon ="bath"
                  incrementText = "+"
                  decrementText = "-"
                  onIncrementDecrement = {this.updateMeta}
                  titleStyle={{}}
                  ranges={bathroomsArr}
                  selected = {bathroom}
                  style = {{
                    height:40,
                    backgroundColor:colors.lightGrey
                  }}
          />

          <View style={[styles.separator,{marginTop:10,marginBottom:10}]}/>
          <Button title="Parking"
                  type="parkingArr"
                  icon ="car"
                  incrementText = "+"
                  decrementText = "-"
                  onIncrementDecrement = {this.updateMeta}
                  titleStyle={{}}
                  ranges={parkingArr}
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
