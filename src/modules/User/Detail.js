import React, { PropTypes,Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { ACTIONS as PROPERTY_ACTIONS } from './../../modules/Property/actions';
import { SELECTORS } from './selectors';
import UserSingle from './Components/UserSingle';

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
    lastImagePress:''
  };

  constructor(){
    super();
    this.loadEntity = this.loadEntity.bind(this);
    this.onImagePress = this.onImagePress.bind(this);
    this.handleFavoritePress = this.handleFavoritePress.bind(this);
    this.fetchProperties = this.fetchProperties.bind(this);
    this.handleFavoritePress = this.handleFavoritePress.bind(this);
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

  render() {
    const { user,properties,isFetching } = this.props;
    return (
      <UserSingle
        {...this.state}
        user={user}
        properties={properties}
        fetchProperties={this.fetchProperties}
        onImagePress={this.onImagePress}
        loadEntity={this.loadEntity}
        handleFavoritePress={this.handleFavoritePress}
        isFetching={isFetching}
      />
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

export default connect(mapStateToProps,mapDispatchToProps)(UserDetail);