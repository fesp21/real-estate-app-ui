/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { StyleSheet,View,Text,Dimensions,TouchableOpacity,Linking, ActionSheetIOS } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './common/actions';
import { SELECTORS } from './common/selectors';
import { NavigationStyles } from '@exponent/ex-navigation';
import NavBack from '../components/NavBack';
import PropertyMapScene from './components/scenes/PropertyMapScene';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 29.3667;
const LONGITUDE = 47.9667;
const LATITUDE_DELTA = 1.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const modalStyle = {
  ...NavigationStyles.SlideVertical,
};

class PropertyMap extends Component {

  static route = {
    navigationBar: {
      title: 'Properties',
      titleStyle: {
        fontSize:15
      },
      style:{...modalStyle},
      tintColor: "#2c2d30",
      renderBackground: (props) => <View style={{height: 64,backgroundColor:'white',opacity:0.8}}/>,
      renderLeft: (route, props) => <NavBack icon="ios-close"  />
    },
  };

  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  };

  onRegionChange = (region) => {
    // console.log('region',region);
  };

  followLocation = (location) => {
  };

  render() {
    const { properties } = this.props;

    return (
      <PropertyMapScene
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        collection={properties}
        followLocation={this.followLocation}
      />
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) }
}

function mapStateToProps(state) {
  return {
    properties:SELECTORS.fetchProperties(state),
    categories:SELECTORS.getCategories(state)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PropertyMap);