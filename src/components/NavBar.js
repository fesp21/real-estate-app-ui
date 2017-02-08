import React from 'react';
import { Image } from 'react-native';

const navBarImage = require('./../../../assets/navbar.png');

const NavBar = () => (
  <Image style={{ top: 0, left: 0, right: 0, height: 64 }} source={navBarImage} resizeMode={'cover'} />
);

export default NavBar;
