/*
 @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, ListView, StyleSheet, StatusBar, Text, TouchableHighlight, TouchableWithoutFeedback, Dimensions, Image, RefreshControl } from 'react-native';
import PropertyIcons from './PropertyIcons';
import PropertyTags from './PropertyTags';
import Swiper from 'react-native-swiper';
import Heart from './Heart';
import LoadingIndicator from './../../../common/LoadingIndicator';

export default class List extends Component {

  static propTypes = {
    collection:PropTypes.array.isRequired,
    loadEntity:PropTypes.func.isRequired,
    onImagePress:PropTypes.func.isRequired,
    handleFavoritePress:PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(item) {
    const { loadEntity,onImagePress,handleFavoritePress} = this.props;

    return (
      <View style={styles.rowContainer}>

        <View style={styles.row}>

          <TouchableHighlight onPress={() => loadEntity(item)} underlayColor="transparent">
            <Text style={styles.title}>{item.title}</Text>
          </TouchableHighlight>

          <Swiper loadMinimal loadMinimalSize={1} style={styles.wrapper} height={180} loop={false}>
            {
              item.images.map((image, i) => {
                return (
                  <TouchableWithoutFeedback key={i} onPress={() => onImagePress(item)} underlayColor="transparent" style={{flex:1}}>
                    <View  style={styles.slide}>
                      <Image style={styles.image} source={{uri: image}} />
                    </View>
                  </TouchableWithoutFeedback>
                );
              })
            }
          </Swiper>

          <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
            <View >
              {
                item.tags &&
                <View style={{flexDirection:'row',padding:10}}>
                  <PropertyTags tags={item.tags} />
                </View>
              }

              {
                item.meta &&
                <View style={{flexDirection:'row',padding:10, paddingTop:0}}>
                  <PropertyIcons services={item.meta} items={['bedroom','bathroom','parking']} />
                </View>
              }
            </View>

            <View style={{marginLeft:30}}>
              <Text style={styles.price}>{item.meta.price}KD</Text>
            </View>

            <View style={{marginLeft:20}}>
              <Heart handleFavoritePress={()=>handleFavoritePress(item)} isFavorited={item.isFavorited} />
            </View>

          </View>

          <View style={styles.separator}/>

        </View>
      </View>
    )
  }

  render() {
    const {collection,isFetching,fetchProperties} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = ds.cloneWithRows(collection);
    return (
      <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
        ref='listView'
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        onEndReachedThreshold={100}
        initialListSize={10}
        renderFooter={()=> isFetching && <LoadingIndicator isFetching={isFetching} style={{ backgroundColor:'white' }} />}
        onEndReached={()=>fetchProperties()}
      />
    );
  }
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },

  wrapper: {
    backgroundColor: '#000',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  rowContainer:{
    flex:1
  },
  row: {
    flex:1,
  },
  title:{
    flex:1,
    color:'#2c2d30',
    margin:10,
    fontWeight:'600'
  },
  image: {
    flex:1,
    width:Dimensions.get('window').width,
    height:188
  },
  separator: {
    flex:1,
    height:.5,
    backgroundColor:'#cbced3'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  price:{
    fontWeight:'600',
    fontSize:16
  },
  loadingImage: {
    width: 60,
    height: 60
  }

});