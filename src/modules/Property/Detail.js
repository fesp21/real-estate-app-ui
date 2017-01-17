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

  render() {
    const { property,comments } = this.props;
    return (
      <PropertySingle property={property} comments={comments}
                      saveComment={this.saveComment}
                      commentBody={this.state.commentBody}
                      onChangeCommentText={this.onChangeCommentText}
      />
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) }
}

function mapStateToProps(state,props) {
  return {
    comments:SELECTORS.fetchComments(state,props)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PropertyDetail);