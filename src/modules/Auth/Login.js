import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS  } from './actions';
import LoginForm from './Components/LoginForm';

class Login extends Component {

  static propTypes =  {
    navigator:PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    redirectRoute:PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      email: 'admin@test.com',
      password: 'password'
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegisterRoute = this.handleRegisterRoute.bind(this);
  };

  handleLogin() {
    const {redirectRoute}= this.props;
    const credentials = { email:this.state.email,password:this.state.password};
    this.props.actions.login(credentials,this.props.navigator.router.getRoute(redirectRoute));
  }

  handleRegisterRoute() {
    const { navigator } = this.props;
    navigator.push(navigator.router.getRoute('register'));
  }

  handleForgotPasswordRoute() {
  }

  onFieldChange(field,value) {
    this.setState({[field]:value});
  }

  render() {
    const { auth } = this.props;
    return (
      <LoginForm
        {...this.state}
        handleLogin={this.handleLogin}
        handleRegisterRoute={this.handleRegisterRoute}
        handleForgotPasswordRoute={this.handleForgotPasswordRoute}
        onFieldChange={this.onFieldChange}
        busy={auth.login.busy}
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);