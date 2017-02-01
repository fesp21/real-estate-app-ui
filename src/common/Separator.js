import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class Separator extends Component {

  render() {
    return (
      <View style={[styles.container, this.props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 0.6,
    backgroundColor: '#E7E7E7',
  },
});
