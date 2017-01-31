import React, { PropTypes,Component } from 'react';
import { ScrollView,StyleSheet, View, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { ACTIONS as PROPERTY_ACTIONS } from './../../modules/Property/actions';
import { SELECTORS } from './selectors';
import UserInfo from './Components/UserInfo';
import PropertyListing from './../../modules/Property/Components/PropertyList';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

const DOUBLE_PRESS_DELAY = 300;

class UserDetail extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired
  };

  static route = {
    navigationBar: {
      title(params) {
        return params.user.name;
      },
    },
  };

  state = {
    lastImagePress:'',
    index: 0,
    routes: [
      { key: '1', title: 'Basic Info' },
      { key: '2', title: 'Listings' },
      { key: '3', title: 'Contact' },
    ],
  };

  constructor(){
    super();
    this.loadEntity = this.loadEntity.bind(this);
    this.onImagePress = this.onImagePress.bind(this);
    this.handleFavoritePress = this.handleFavoritePress.bind(this);
    this.fetchProperties = this.fetchProperties.bind(this);
    this.handleFavoritePress = this.handleFavoritePress.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }


  handleFavoritePress(item:object) {
    this.props.actions.favoriteProperty(item);
  }

  loadEntity(item: object) {
    const { navigator } = this.props;
    navigator.push(navigator.router.getRoute('propertyDetail',{
      property:item
    }));
  }

  fetchProperties() {
    this.props.actions.fetchProperties();
  }

  onImagePress(item: object) {
    const now = new Date().getTime();
    var delta = now - this.state.lastImagePress;

    if(delta < DOUBLE_PRESS_DELAY) {
      // favorite item
      this.handleFavoritePress(item);
    }
    this.setState({lastImagePress: now});
  }

  handleChangeTab(index){
    this.setState({ index });
  };

  renderHeader(props){
    return <TabBar {...props} />;
  };

  renderScene({ route }){
    const {properties,isFetching} = this.props;
    switch (route.key) {
      case '1':
        return <View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
      case '2':
        return (
          <PropertyListing
            collection = {properties}
            loadEntity = {this.loadEntity}
            onImagePress = {this.onImagePress}
            handleFavoritePress = {this.handleFavoritePress}
            isFetching={isFetching}
            fetchProperties={this.fetchProperties}
            horizontal={true}
          />
        );
      case '3':
        return (
          <View/>
        )
      default:
        return null;
    }
  };



  render() {
    const { user,properties,isFetching } = this.props;

    return (
      <ScrollView style={{flex:1,paddingTop:64}}>
        <UserInfo
          user={user}
        />
        <PropertyListing
          collection = {properties}
          loadEntity = {this.loadEntity}
          onImagePress = {this.onImagePress}
          handleFavoritePress = {this.handleFavoritePress}
          isFetching={isFetching}
          fetchProperties={this.fetchProperties}
          horizontal={true}
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
    properties:SELECTORS.fetchProperties(state),
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