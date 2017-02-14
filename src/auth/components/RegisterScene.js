import React, { Component, PropTypes } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TextInput
} from "react-native";
import colors from "./../../common/colors";

export default class RegisterScene extends Component {
  static propTypes = {
    handleRegister: PropTypes.func.isRequired,
    handleLoginRoute: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired
  };

  render() {
    const backgroundImage = require("./../../../assets/login-bg.png");
    const {
      name,
      email,
      mobile,
      password,
      password_confirmation,
      onFieldChange,
      handleLoginRoute,
      handleRegister,
      busy
    } = this.props;

    return (
      <View source={backgroundImage} style={styles.container}>

        <Text style={styles.label}>NAME</Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={value => onFieldChange("name", value)}
          value={name}
          maxLength={40}
          placeholderTextColor="gray"
        />
        <View style={styles.separator} />

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={value => onFieldChange("email", value)}
          value={email}
          maxLength={40}
          placeholderTextColor="gray"
        />
        <View style={styles.separator} />

        <Text style={styles.label}>MOBILE</Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={value => onFieldChange("mobile", value)}
          value={mobile}
          maxLength={40}
          placeholderTextColor="gray"
        />
        <View style={styles.separator} />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={value => onFieldChange("password", value)}
          value={password}
          maxLength={40}
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
        <View style={styles.separator} />

        <Text style={styles.label}>CONFIRM PASSWORD</Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={value => onFieldChange("password_confirmation", value)}
          value={password_confirmation}
          maxLength={40}
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
        <View style={styles.separator} />

        <TouchableHighlight
          onPress={() => handleRegister()}
          title="Login"
          style={[styles.button, { marginTop: 50 }]}
          underlayColor="transparent"
        >
          <Text style={styles.buttonText}>
            {busy ? "signing up" : "Register"}
          </Text>
        </TouchableHighlight>

        <Text
          style={[
            styles.textCenter,
            { paddingTop: 30, paddingBottom: 30, color: "white" }
          ]}
        >
          or
        </Text>

        <TouchableHighlight
          onPress={() => handleLoginRoute()}
          underlayColor="transparent"
          style={[styles.button, styles.center, { opacity: 0.5 }]}
        >
          <Text
            style={[styles.buttonText, styles.textCenter, { color: "black" }]}
          >
            Login
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "transparent",
    padding: 20,
    paddingTop: 64
  },
  label: {
    fontSize: 12,
    color: colors.smokeGreyDark,
    marginTop: 15,
    marginBottom: 2,
    fontWeight: "100"
  },
  textCenter: {
    alignSelf: "center"
  },
  mTop20: {
    marginTop: 20
  },
  textInput: {
    height: 25,
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
    fontSize: 14,
    color: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.smokeGreyLight
  },
  link: {
    marginTop: 20,
    color: "white",
    fontSize: 13
  },
  button: {
    backgroundColor: "#CCCCCC",
    opacity: 0.7,
    borderRadius: 30,
    padding: 10,
    height: 40,
    width: 200,
    alignSelf: "center"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14
  }
});
