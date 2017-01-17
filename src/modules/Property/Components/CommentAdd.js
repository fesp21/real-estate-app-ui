/*
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Colors from './../../../common/Colors';

export default class CommentAdd extends Component {

  static propTypes = {
    saveComment:PropTypes.func.isRequired,
    commentBody:PropTypes.string.isRequired,
    onChangeCommentText:PropTypes.func.isRequired,
  };

  state = {
    // textInputHeight:40
  };

  render() {
    const {saveComment,commentBody,onChangeCommentText} = this.props;
    return (

        <View style={styles.container}>
          <TextInput
            placeholder="Add Comment"
            maxLength={256}
            style={[styles.commentText] }
            value={commentBody}
            onChangeText={(value)=>onChangeCommentText(value)}
            onSubmitEditing={()=>saveComment()}
            returnKeyType="done"
            clearButtonMode="always"
          />
        </View>

    )
  }
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    paddingVertical:10,
  },
  commentText: {
    flex:1,
    height:40,
    padding:5,
    borderColor:Colors.smokeGreyLight,
    borderRadius:2,
    borderWidth:1,
    fontSize:14,
    color:Colors.darkGrey,
    fontWeight:'100'
  },
});