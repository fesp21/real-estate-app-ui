import React, { Component } from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import Root from './src/Root';

StatusBar.setBarStyle('light-content');
console.disableYellowBox = true;

AppRegistry.registerComponent('property', () => Root);
