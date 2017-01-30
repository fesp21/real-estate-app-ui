/*
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Dimensions, Image,KeyboardAvoidingView } from 'react-native';
import PropertyIcons from './PropertyIcons';
import PropertyTags from './PropertyTags';
import CommentList from './CommentList';
import CommentAdd from './CommentAdd';
import Heart from './Heart';

export default class PropertySingle extends Component {

  static propTypes = {
    property:PropTypes.object.isRequired,
    saveComment:PropTypes.func.isRequired,
    commentBody:PropTypes.string.isRequired,
    onChangeCommentText:PropTypes.func.isRequired,
    handleFavoritePress:PropTypes.func.isRequired
  };

  render() {
    const {property,saveComment,commentBody,onChangeCommentText,handleFavoritePress} = this.props;

    return (

      <ScrollView style={styles.container}
                  showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView behavior='position' >

          <Image source={{uri: property.images[0]}} style={styles.image} />

          <View style={styles.content}>

            <Text style={styles.title}>{property.title}</Text>

            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
              <View>
                {
                  property.tags &&
                  <View style={{flexDirection:'row',padding:10}}>
                    <PropertyTags tags={property.tags} />
                  </View>
                }

                {
                  property.meta &&
                  <View style={{flexDirection:'row',padding:10, paddingTop:0}}>
                    <PropertyIcons services={property.meta} items={['bedroom','bathroom','parking']} />
                  </View>
                }

              </View>


              <View style={{marginLeft:30}}>
                <Text style={styles.price}>{property.meta.price}KD</Text>
              </View>

              <View style={{marginLeft:20}}>
                <Heart handleFavoritePress={()=>handleFavoritePress(property)} isFavorited={property.isFavorited} />
              </View>

            </View>

            <View style={{flex:1,flexDirection:'row'}}>
              <Text>By</Text>
              <TouchableHighlight underlayColor="transparent" onPress={()=>{}} style={{flex:1,marginHorizontal:10}}>
                <Text>{property.user.name} </Text>
              </TouchableHighlight>

            </View>


            <View style={styles.separator}/>

            <View>
              <Text style={styles.descTitle} >Description</Text>
              <Text style={styles.description} >{property.description}</Text>
            </View>

            <View style={styles.separator}/>

            <View style={{flex:1,alignItems:'center'}}>
              <Text style={[styles.descTitle,{marginBottom:10}]} >Amenities</Text>
              {
                property.amenities.map((amenity) =>
                  <Text key={amenity} style={styles.amenity}>{amenity}</Text>
                )
              }
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
  },
  amenity :{
    fontSize:15,
    textAlign:'justify',
    color:'#384760',
    fontFamily:'Avenir-Light'
  }

});