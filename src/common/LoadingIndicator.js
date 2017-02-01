import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const LoadingIndicator = ({ style }) => (
  <View style={[{ alignItems: 'center', padding: 10 }, style]}>
    <ActivityIndicator size="small" animating color="purple" />
  </View>
  );

LoadingIndicator.propTypes = {
  style: View.propTypes.style.isRequired,
};

export default LoadingIndicator;
