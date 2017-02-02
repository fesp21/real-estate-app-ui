/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { StyleSheet,View,Text,Dimensions,TouchableOpacity,Linking, ActionSheetIOS } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { SELECTORS } from './selectors';
import { NavigationStyles } from '@exponent/ex-navigation';
import NavBack from './../../common/NavBack';
import MapMarker from './Components/MapMarker';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 29.3667;
const LONGITUDE = 47.9667;
const LATITUDE_DELTA = 1.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const modalStyle = {
  ...NavigationStyles.SlideVertical,
  sceneAnimations: (props) => {
    return {
      backgroundColor: 'white',
    };
  }
};

class PropertyMap extends Component {

  constructor() {
    super();
    this.onRegionChange = this.onRegionChange.bind(this);
    this.followLocation = this.followLocation.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Properties',
      titleStyle: {
        fontSize:15
      },
      style:{...modalStyle},
      tintColor: "#2c2d30",
      renderLeft: (route, props) => <NavBack text="Cancel" style={{ fontSize:13 }} />
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


  componentDidMount() {
    this.props.actions.fetchProperties();
  }


  onRegionChange(region) {
    // console.log('region',region);
  }

  followLocation(location) {
  }

  render() {
    const { properties } = this.props;

    return (
      <MapMarker
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