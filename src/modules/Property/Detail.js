import React, { PropTypes,Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { SELECTORS } from './selectors';
import PropertySingle from './Components/PropertySingle';

class PropertyDetail extends Component {

  static propTypes = {
    property:PropTypes.object.isRequired,
    actions:PropTypes.object.isRequired
  };

  constructor(){
    super();
    this.saveComment = this.saveComment.bind(this);
    this.onChangeCommentText = this.onChangeCommentText.bind(this);
    this.handleFavoritePress = this.handleFavoritePress.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  state = {
    commentBody:''
  };

  saveComment() {
    console.log('saving comment',this.state.commentBody);
  }

  onChangeCommentText(value) {
    return this.setState({commentBody:value});
  }

  handleFavoritePress(item:object) {
    this.props.actions.favoriteProperty(item);
  }

  loadUser(user) {
    const {navigator} = this.props;
    return navigator.push(navigator.router.getRoute('userDetail',{
      user
    }));
  }

  showSlider = () => {
    const {property} = this.props;
    // navigator.push(navigator.router.getRoute('propertyFilters'));
    let navigator = this.props.navigation.getNavigator('rootStack');
    return navigator.push(navigator.router.getRoute('propertySlideShow',{
      images:property.images
    }));
  };

  render() {
    const { property,comments } = this.props;
    return (
      <PropertySingle property={property} comments={comments}
                      saveComment={this.saveComment}
                      commentBody={this.state.commentBody}
                      onChangeCommentText={this.onChangeCommentText}
                      handleFavoritePress={this.handleFavoritePress}
                      loadUser={this.loadUser}
                      showSlider={this.showSlider}
      />
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) }
}

function mapStateToProps(state,props) {
  return {
    comments:SELECTORS.fetchComments(state,props),
    property:SELECTORS.fetchProperty(state,props)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PropertyDetail);