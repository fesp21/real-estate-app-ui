import React, { Component, PropTypes } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "./../common/colors";

export default class Done extends Component {
  static propTypes = {
    emitter: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };

  handlePress() {
    this.props.emitter.emit("reset");
  }

  render() {
    const { visible, title } = this.props;
    if (!visible) return null;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handlePress()}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 10,
    backgroundColor: "transparent"
  },
  title: {
    color: colors.tomato,
    fontSize: 15
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: "center",
    color: colors.tomato
  },
  badgeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  badge: {
    backgroundColor: "#fff",
    height: 28,
    width: 28,
    borderRadius: 14,
    margin: 8,
    justifyContent: "center"
  },
  badgeText: {
    backgroundColor: "transparent",
    marginTop: -1,
    color: "#0084FF",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center"
  }
});
