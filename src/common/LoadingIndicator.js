import React, { Component, PropTypes } from 'react';
import { ActivityIndicator,View,Dimensions } from 'react-native'

export default class LoadingIndicator extends Component {
  render() {
    //@todo:fix
    return (
      <View style={[{alignItems: 'center',padding:10 },this.props.style]}>
        <ActivityIndicator size="small" animating={true} color="purple" />
      </View>
    );
  }
}