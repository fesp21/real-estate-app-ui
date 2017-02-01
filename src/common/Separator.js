import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = () => (
  <View style={[styles.container, this.props.style]} />
  );

Separator.propTyes = {
  style: View.propTypes.style,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 0.6,
    backgroundColor: '#E7E7E7',
  },
});

export default Separator;
