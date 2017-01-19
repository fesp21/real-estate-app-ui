import React, { Component } from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import Root from './src/Root';

StatusBar.setBarStyle('light-content');
console.disableYellowBox = true;

// const _XHR = GLOBAL.originalXMLHttpRequest ?
//   GLOBAL.originalXMLHttpRequest :
//   GLOBAL.XMLHttpRequest;
//
// XMLHttpRequest = _XHR;

// if(typeof global.self === "undefined")
// {
//   global.self = global;
// }

AppRegistry.registerComponent('property', () => Root);
