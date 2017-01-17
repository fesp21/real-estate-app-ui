/**
 * @flow
 */
import React, {PropTypes, Component, PureComponent} from "react";
import {View, StyleSheet, StatusBar, Text, Image, Dimensions} from "react-native";
import Router from "./../../lib/router";
import {StackNavigation} from "@exponent/ex-navigation";

export default class PropertyCreateStack extends Component {


  static route={
    navigationBar:{
      visible:false
    }
  }

  render() {
    return (
      <StackNavigation
        id={`propertiesCreateStack`}
        navigatorUID={`propertiesCreateStack`}
        initialRoute={Router.getRoute(`propertyCreate`)}
        defaultRouteConfig={{
          navigationBar: {
            visible:false
          }
        }}
      />
    );
  }
}

const styles =  StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: 64,
  }
});