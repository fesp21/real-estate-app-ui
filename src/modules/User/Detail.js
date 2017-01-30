import React, { PropTypes,Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { SELECTORS } from './selectors';
import UserSingle from './Components/UserSingle';

class UserDetail extends Component {

  static propTypes = {
    property:PropTypes.object.isRequired,
    actions:PropTypes.object.isRequired
  };

  constructor(){
    super();
    this.saveComment = this.saveComment.bind(this);
    this.onChangeCommentText = this.onChangeCommentText.bind(this);
    this.handleFavoritePress = this.handleFavoritePress.bind(this);
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

  render() {
    const { user } = this.props;
    return (
      <UserSingle user={user}
      />
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) }
}

function mapStateToProps(state,props) {
  return {
    user:SELECTORS.getUser(state,props)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserDetail);