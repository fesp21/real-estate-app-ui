/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { ScrollView,View, StyleSheet, Text, TouchableHighlight,TouchableWithoutFeedback } from 'react-native';
import colors from '../../../common/colors';
import List from './List';
import Button from './Button';
import Separator from '../../../components/Separator'
import Ionicons from 'react-native-vector-icons/Ionicons';
import isEmpty from 'lodash/isEmpty';

export default class FilterScene extends Component {

  static propTypes = {
    priceFromArr:PropTypes.array.isRequired,
    priceToArr:PropTypes.array.isRequired,
    priceFrom:PropTypes.string.isRequired,
    priceTo:PropTypes.string.isRequired,
    onPriceFromSelect:PropTypes.func.isRequired,
    onPriceToSelect:PropTypes.func.isRequired,
    onSearchPress:PropTypes.func.isRequired,
    categories:PropTypes.array.isRequired,
    category:PropTypes.string.isRequired,
    sortOptions:PropTypes.array.isRequired,
    sortBy:PropTypes.string.isRequired,
    onSortSelect:PropTypes.func.isRequired,
    showSearch:PropTypes.func.isRequired,
    searchString:PropTypes.string.isRequired,
    onSearch:PropTypes.func.isRequired
  };

  render() {
    const {
      priceFromArr,onPriceFromSelect,priceFrom,
      priceToArr,onPriceToSelect,priceTo,
      bedroomsArr,bedroom,
      bathroomsArr,bathroom,
      parkingArr,parking,
      onSearchPress,
      categories,category,onCategorySelect,
      sortOptions,sortBy,onSortSelect,
      showSearch,onSearch,searchString,
      onMetaSelect
    } = this.props;

    return (
      <View style={{flex:1}}>

        <ScrollView style={styles.container}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    contentInset={{bottom:60}}
        >
          <View style={{flex:1,flexDirection:'row',padding:5,alignItems:'center'}}>
            <Ionicons name="ios-search" size={18}  color={colors.darkGrey} style={{ height:18,width:20 }}/>
            <TouchableWithoutFeedback onPress={()=>showSearch()}>
              <View style={{ flex:1,padding:8,backgroundColor:'#E3E3E3',borderRadius:30}}>
                {isEmpty(searchString) ?
                  <Text style={{ padding:3,paddingLeft:10,fontWeight:'400',color:colors.white }}>
                    Search by Location
                  </Text>
                  :
                  <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{ flex:1,padding:3,paddingLeft:10,fontWeight:'500',color:colors.darkGrey }}>
                      {searchString}
                    </Text>
                    <TouchableHighlight onPress={()=>onSearch('')} style={styles.closeButtonContainer} >
                      <Ionicons name="ios-close-circle-outline" size={16} color={colors.tomato} />
                    </TouchableHighlight>
                  </View>
                }
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Separator style={{ marginTop:10,marginBottom:10 }}/>

          <List selected={sortBy} onSelect={onSortSelect} ranges={sortOptions} title="Sort By"/>

          <List selected={category} onSelect={onCategorySelect} ranges={categories} title="Property Type"/>

          <Separator style={{ marginBottom:20 }}/>

          <List title="Price Range" ranges={priceFromArr}
                selected={priceFrom} onSelect={onPriceFromSelect}
                hint="kd"
          />
          <List title="to"
                ranges={priceToArr} selected={priceTo} onSelect={onPriceToSelect}
                titleStyle={{fontSize:12,color:colors.tomato,fontWeight:'400'}}
                hint="kd"
          />

          <Separator style={{ marginBottom:20 }}/>

          <Button title="Bed"
                  icon ="bed"
                  incrementText = "+"
                  decrementText = "-"
                  onPress = {(value)=>onMetaSelect('bedroom',value)}
                  range={bedroomsArr}
                  selected = {bedroom}
          />

          <Separator style={{ marginTop:20,marginBottom:20 }}/>

          <Button title="Bath"
                  icon ="bath"
                  incrementText = "+"
                  decrementText = "-"
                  onPress = {(value)=>onMetaSelect('bathroom',value)}
                  range={bathroomsArr}
                  selected = {bathroom}
          />

          <Separator style={{ marginTop:20,marginBottom:20 }}/>

          <Button title="Parking"
                  icon ="car"
                  incrementText = "+"
                  decrementText = "-"
                  onPress = {(value)=>onMetaSelect('parking',value)}
                  range={parkingArr}
                  selected = {parking}
          />

        </ScrollView>

        <TouchableHighlight underlayColor="transparent" onPress={onSearchPress} style={styles.footer}>
          <Text style={styles.footerText}>
            Apply Filter
          </Text>
        </TouchableHighlight>

      </View>
    );
  }

}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    padding:10,
    backgroundColor:'white',
    opacity:.97
  },
  footer:{
    backgroundColor:colors.tomato,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height:56,
    alignItems:'center',
    justifyContent:'center'
  },
  footerText: {
    color:'white',
    fontWeight:'500',
    fontSize:18
  },
  closeButtonContainer:{
    paddingBottom:4,
    paddingTop:4,
    paddingLeft:10,
    paddingRight:10
  }

});