import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image,TouchableHighlight, TextInput } from 'react-native';

export default class LoginForm extends Component {

  static propTypes = {
    handleForgotPasswordRoute:PropTypes.func.isRequired,
    handleRegisterRoute:PropTypes.func.isRequired,
    handleLogin:PropTypes.func.isRequired,
    onFieldChange:PropTypes.func.isRequired,
    email:PropTypes.string.isRequired,
    password:PropTypes.string.isRequired,
  };

  constructor(props){
    super(props);
  }

  render() {
    const backgroundImage = require('./../../../../assets/login-bg.png');
    const { email, password, onFieldChange, handleLogin, handleRegisterRoute, handleForgotPasswordRoute } = this.props;

    return (
      <Image source={backgroundImage} style={styles.container}>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => onFieldChange('email',value)}
          value={email}
          maxLength={40}
          placeholderTextColor="gray"
        />
        <View style={styles.separator}/>

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => onFieldChange('password',value)}
          value={password}
          maxLength={40}
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
        <View style={styles.separator}/>


        <TouchableHighlight onPress={()=>handleLogin()} title="Login" style={[styles.button,{marginTop:50}]} underlayColor='transparent' >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableHighlight>

        <Text style={[styles.textCenter,{paddingTop:30,paddingBottom:30,color:'white'}]}>
          or
        </Text>

        <TouchableHighlight onPress={()=>handleRegisterRoute()} underlayColor='transparent'
                            style={[styles.button,styles.center,{opacity:.5}]}
        >
          <Text style={[styles.buttonText,styles.textCenter,{color:'black'}]}>CREATE AN ACCOUNT</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=>handleForgotPasswordRoute()} style={[styles.textCenter,{paddingTop:100}]}
                            underlayColor='transparent' >
          <Text style={[styles.link,styles.textUnderline]}>Forgot your password ?</Text>
        </TouchableHighlight>


      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: null,
    height: null,
    paddingTop: 100,
    backgroundColor:'transparent',
    padding:20
  },
  label: {
    fontSize: 12,
    color: 'black',
    marginTop:15,
    marginBottom:2,
    opacity:.8
  },
  textCenter: {
    alignSelf: 'center'
  },
  mTop20: {
    marginTop: 20
  },
  textInput:{
    height: 25,
    borderRightColor:'transparent',
    borderTopColor:'transparent',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth:1,
    fontSize:14,
    color:'white'
  },
  title:{
    fontSize:20,
    fontWeight:'700',
    textAlign:'center',
    marginBottom:20
  },
  separator:{
    height:0.5,
    backgroundColor:'#CCCCCC',
  },
  link :{
    marginTop:20,
    color:'white',
    fontSize:13
  },
  button : {
    backgroundColor:'#CCCCCC',
    opacity:0.7,
    borderRadius:30,
    padding:10,
    height:40,
    width:200,
    alignSelf:'center'
  },
  buttonText:{
    color:'white',
    textAlign:'center',
    fontSize:14,
  }
});