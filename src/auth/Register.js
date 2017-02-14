/*
 @flow
 */
import React, { Component, PropTypes } from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ACTIONS } from "./common/actions";
import RegisterScene from "./components/RegisterScene";
import colors from "./../common/colors";

type State = {
  name: string,
  email: string,
  password: string,
  mobile: string
};

class Register extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  };

  static route = {
    navigationBar: {
      tintColor: colors.primary,
      renderBackground: props => (
        <View style={{ height: 64, backgroundColor: "white", opacity: 0.8 }} />
      )
    }
  };

  state: State = {
    name: "ZaL",
    email: "z4ls@live.com",
    mobile: "97978803",
    password: "password",
    password_confirmation: "password"
  };

  handleLoginRoute = () => {
    const { navigator } = this.props;
    navigator.push(
      navigator.router.getRoute("login", { redirectRoute: "settingList" })
    );
  };

  handleRegister = () => {
    let credentials = { ...this.state };
    this.props.actions.register(credentials);
  };

  onFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    const { auth } = this.props;
    return (
      <RegisterScene
        {...this.state}
        handleLoginRoute={this.handleLoginRoute}
        handleRegister={this.handleRegister}
        onFieldChange={this.onFieldChange}
        busy={auth.register.busy}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(ACTIONS, dispatch) };
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
