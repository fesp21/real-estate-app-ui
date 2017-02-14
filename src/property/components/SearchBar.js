import React, { Component, PropTypes } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "@exponent/ex-navigation";

@withNavigation
export default class SearchBar extends Component {
  static propTypes = {
    // loadFilterScene:PropTypes.func.isRequired
  };

  loadFilterScene() {
    // const {navigator} = this.props;
    let navigator = this.props.navigation.getNavigator("rootStack");
    navigator.push(navigator.router.getRoute("propertyFilters"));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            this.loadFilterScene();
          }}
          underlayColor="transparent"
        >
          <Icon name="sliders" size={25} style={styles.icon} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 15,
    paddingLeft: 5
  },
  icon: {
    width: 20,
    height: 25,
    color: "white"
  }
});
