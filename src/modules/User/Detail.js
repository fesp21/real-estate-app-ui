import React, { PropTypes,Component } from 'react';
import { ScrollView,StyleSheet, View, Dimensions,Image } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { ACTIONS as PROPERTY_ACTIONS } from './../../modules/Property/actions';
import { SELECTORS } from './selectors';
import { SELECTORS as PROPERTY_SELECTORS } from './../../modules/Property/selectors';
import UserProfile from './Components/UserProfile';

const DOUBLE_PRESS_DELAY = 300;

class UserDetail extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired
  };

  static route = {
    navigationBar: {
      renderBackground: (props) => <View><Image style={[styles.bgImage]} source={{uri: 'http://il9.picdn.net/shutterstock/videos/3951179/thumb/1.jpg'}} resizeMode={'cover'} /></View>
    },
  };

  state = {
    lastImagePress:'',
  };

  handleFavoritePress = (item:object) => {
    this.props.actions.favoriteProperty(item);
  };

  loadEntity = (item: object) => {
    const { navigator } = this.props;
    navigator.push(navigator.router.getRoute('propertyDetail',{
      property:item
    }));
  };

  fetchProperties = () => {
    this.props.actions.fetchProperties();
  };

  onImagePress = (item: object) => {
    const now = new Date().getTime();
    let delta = now - this.state.lastImagePress;

    if(delta < DOUBLE_PRESS_DELAY) {
      // favorite item
      this.handleFavoritePress(item);
    }
    this.setState({lastImagePress: now});
  };

  render() {
    return (
      <ScrollView style={{flex:1,paddingTop:64}}>
        <UserProfile {...this.props}
          loadEntity={this.loadEntity}
          onImagePress ={this.onImagePress}
          fetchProperties ={this.fetchProperties}
          handleFavoritePress ={this.handleFavoritePress}
        />
      </ScrollView>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS, ...PROPERTY_ACTIONS }, dispatch) }
}

function mapStateToProps(state,props) {
  return {
    user:SELECTORS.getUser(state,props),
    properties:PROPERTY_SELECTORS.fetchProperties(state),
    isFetching:state.propertyReducer.isFetching
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(UserDetail);