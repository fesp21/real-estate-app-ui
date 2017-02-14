/*
 @flow
 */
import React, { Component, PropTypes } from "react";
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

import Separator from "../../components/Separator";
import colors from "../../common/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class List extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    loadScene: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
  };

  render() {
    const { title, icon, route, loadScene } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => loadScene(route)}
          underlayColor="transparent"
        >
          <View style={styles.rowContainer}>
            <View style={{ flex: 9 }}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <FontAwesome
                style={styles.icon}
                name={icon}
                color={colors.darkGrey}
                size={20}
              />
            </View>
          </View>
        </TouchableHighlight>
        <Separator style={{ marginTop: 20, marginBottom: 20 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: colors.darkGrey,
    fontWeight: "200"
  },
  icon: {
    fontWeight: "100"
  }
});
