import React, { PropTypes, Component } from 'react';
import { Image } from 'react-native';
const NavBar = (props) => {
  const navbarImage = require('./../../assets/navbar.png');

  return (
    <Image style={{ top: 0, left: 0, right: 0, height: 64 }} source={navbarImage} resizeMode={'cover'} />
  );
};
export default NavBar;
