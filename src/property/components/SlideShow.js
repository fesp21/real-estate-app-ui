/** @flow */

import React, { Component,PropTypes } from 'react';
import { Animated, View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';
import NavBack from '../../common/components/NavBack';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class PropertySlideShow extends Component {

  static propTypes = {
    style: View.propTypes.style,
    images:PropTypes.array.isRequired
  };

  state = {
    index: 0,
    routes: Object.keys(this.props.images).map(key => ({ key })),
  };

  static route = {
    navigationBar: {
      backgroundColor: 'rgba(0,0,0,.9)',
      tintColor:'white',
      renderLeft: (route, props) => <NavBack text="Close" icon="ios-close" style={{ color:'white' }} />,
    },
  };


  _buildCoverFlowStyle = ({ layout, position, route, navigationState }) => {
    // const { width } = layout;
    // const { routes } = navigationState;
    // const currentIndex = routes.indexOf(route);
    // // Prepend '-1', so there are always at least 2 items in inputRange
    // const inputRange = [ -1, ...routes.map((x, i) => i) ];
    // const translateOutputRange = inputRange.map(i => {
    //   return ((width / 6) * (currentIndex - i)) * -1;
    // });
    // const scaleOutputRange = inputRange.map(i => {
    //   if (currentIndex === i) {
    //     return 1;
    //   } else {
    //     return 0.7;
    //   }
    // });
    // const opacityOutputRange = inputRange.map(i => {
    //   if (currentIndex === i) {
    //     return 1;
    //   } else {
    //     return 0.1;
    //   }
    // });
    //
    // const translateX = position.interpolate({
    //   inputRange,
    //   outputRange: translateOutputRange,
    // });
    // const scale = position.interpolate({
    //   inputRange,
    //   outputRange: scaleOutputRange,
    // });
    // const opacity = position.interpolate({
    //   inputRange,
    //   outputRange: opacityOutputRange,
    // });
    //
    // return {
    //   transform: [
    //     { translateX },
    //     { scale },
    //   ],
    //   opacity,
    // };
  };

  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderScene = (props) => {
    return (
      <Animated.View style={[ styles.page, this._buildCoverFlowStyle(props) ]}>
        <View style={styles.album}>
          <Image source={{uri:this.props.images[props.route.key]}} style={styles.cover}
                 resizeMode="contain"
          />
        </View>
      </Animated.View>
    );
  };

  _renderPager = (props) => {
    return <TabViewPagerPan {...props} />;
  };

  render() {
    return (
      <TabViewAnimated
        style={[ styles.container, this.props.style ]}
        navigationState={this.state}
        renderScene={this._renderScene}
        onRequestChangeTab={this._handleChangeTab}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({container: {
  flexGrow: 1,
  backgroundColor: '#000',
  alignItems:'center'
},
  page: {
    flexGrow: 1,
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  album: {
    backgroundColor: '#000',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
    },
  },
  cover: {
    alignSelf:'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
  label: {
    margin: 16,
    color: '#fff',
  },});
