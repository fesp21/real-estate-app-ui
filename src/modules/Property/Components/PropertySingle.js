/*
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image,KeyboardAvoidingView } from 'react-native';
import PropertyIcons from './PropertyIcons';
import PropertyTags from './PropertyTags';
import CommentList from './CommentList';
import CommentAdd from './CommentAdd';

export default class PropertySingle extends Component {

  static propTypes = {
    property:PropTypes.object.isRequired,
    saveComment:PropTypes.func.isRequired,
    commentBody:PropTypes.string.isRequired,
    onChangeCommentText:PropTypes.func.isRequired
  };

  render() {
    const {property,saveComment,commentBody,onChangeCommentText} = this.props;
    return (

      <ScrollView style={styles.container}
                  showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView behavior='position' >

          <Image source={{uri: property.images[0]}} style={styles.image} />

          <View style={styles.content}>

            <Text style={styles.title}>{property.title}</Text>

            {
              property.tags &&
              <View style={styles.tags}>
                <PropertyTags tags={property.tags} />
              </View>
            }

            {
              property.meta &&
              <View style={styles.icons}>
                <PropertyIcons services={property.meta} items={['bedrooms','bathrooms','parking']} />
              </View>
            }

            <View style={styles.separator}/>

            <View>
              <Text style={styles.descTitle} >Description</Text>
              <Text style={styles.description} >{property.description}</Text>
            </View>

            <View style={styles.separator}/>

            <View>
              <Text style={styles.descTitle} >Comments</Text>
              <CommentList collection={property.comments} />
              <CommentAdd saveComment={saveComment} commentBody={commentBody}
                          onChangeCommentText={onChangeCommentText}
              />
            </View>

          </View>

        </KeyboardAvoidingView>
      </ScrollView>

    );
  }
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    paddingTop:64,
    width:Dimensions.get('window').width
  },
  content:{
    flex:1,
    margin:10
  },
  image: {
    width:Dimensions.get('window').width,
    height:200
  },
  tags:{
    marginTop:10,
    flexDirection:'row',
  },
  icons:{
    marginTop:10,
    flexDirection:'row',
  },
  title:{
    color:'#2c2d30',
    fontWeight:'600'
  },
  descTitle:{
    textAlign:'center',
    marginTop:10,
    fontSize:14,
    color:'#2c2d30'
  },
  description: {
    marginTop:10,
    fontSize:15,
    textAlign:'justify',
    color:'#384760',
    fontFamily:'Avenir-Light'

  },
  separator: {
    marginTop:10,
    height:.5,
    backgroundColor:'#cbced3'
  }

});