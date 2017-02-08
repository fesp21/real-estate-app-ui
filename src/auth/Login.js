import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS  } from './actions';
import LoginScene from './Components/LoginScene';
import colors from './../common/colors';

class Login extends Component {

  static propTypes =  {
    navigator:PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    redirectRoute:PropTypes.string.isRequired
  };

  static route = {
    navigationBar : {
      tintColor:colors.primary,
      renderBackground: (props) => <View style={{height: 64,backgroundColor:'white',opacity:0.8}}/>,
    }
  };

  state = {
    email: 'admin@test.com',
    password: 'password'
  };

  handleLogin = () => {
    const {redirectRoute}= this.props;
    const credentials = { email:this.state.email,password:this.state.password};
    this.props.actions.login(credentials,this.props.navigator.router.getRoute(redirectRoute));
  };

  handleRegisterRoute = () => {
    const { navigator } = this.props;
    navigator.push(navigator.router.getRoute('register'));
  };

  handleForgotPasswordRoute() {
  }

  onFieldChange = (field,value) => {
    this.setState({[field]:value});
  };

  render() {
    const { auth } = this.props;
    return (
      <LoginScene
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