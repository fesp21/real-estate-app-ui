/*
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { ACTIONS } from './actions';
import RegisterForm from './Components/RegisterForm';

type State = {
  name: string,
  email: string,
  password: string,
  mobile: string
};

class Register extends Component {

  static propTypes = {
    auth:PropTypes.object.isRequired,
    actions:PropTypes.object.isRequired,
    navigator:PropTypes.object.isRequired
  };

  state: State = {
    name: 'ZaL',
    email: 'z4ls@live.com',
    mobile:'97978803',
    password: 'password',
    password_confirmation:'password',
  };

  constructor(props) {
    super(props);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleLoginRoute = this.handleLoginRoute.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  };

  handleLoginRoute() {
    const { navigator } = this.props;
    navigator.push(navigator.router.getRoute('login',{redirectRoute:'settingList'}));
  }

  handleRegister() {
    let credentials = {...this.state};
    this.props.actions.register(credentials);
  }

  onFieldChange(field,value) {
    this.setState({[field]:value});
  }


  render() {
    const {auth} = this.props;
    return (
      <RegisterForm
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
  return { actions: bindActionCreators(ACTIONS, dispatch) }
}

function mapStateToProps(state) {
  return {
    auth:state.authReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);