/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { ScrollView,View, StyleSheet, Text, TouchableHighlight,TouchableWithoutFeedback } from 'react-native';
import Colors from '../../../../Components/Colors';
import List from './List';
import Button from './Button';
import Separator from '../../../../Components/Separator';
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
      onIncrementDecrement,
      onSearchPress,
      categories,category,onCategorySelect,
      sortOptions,sortBy,onSortSelect,
      showSearch,onSearch,searchString
    } = this.props;

    return (
      <View style={{flex:1}}>

        <ScrollView style={styles.container}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    contentInset={{bottom:60}}
        >
          <View style={{flex:1,flexDirection:'row',padding:5,alignItems:'center'}}>
            <Ionicons name="ios-search" size={18}  color={Colors.darkGrey} style={{ height:18,width:20 }}/>
            <TouchableWithoutFeedback onPress={()=>showSearch()}>
              <View style={{ flex:1,padding:8,backgroundColor:'#E3E3E3',borderRadius:30}}>
                {isEmpty(searchString) ?
                  <Text style={{ padding:3,paddingLeft:10,fontWeight:'400',color:Colors.white }}>
                    Search by Location
                  </Text>
                  :
                  <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{ flex:1,padding:3,paddingLeft:10,fontWeight:'500',color:Colors.darkGrey }}>
                      {searchString}
                    </Text>
                    <TouchableHighlight onPress={()=>onSearch('')} style={styles.closeButtonContainer} >
                      <Ionicons name="ios-close-circle-outline" size={16} color={Colors.tomato} />
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
                titleStyle={{fontSize:12,color:Colors.tomato,fontWeight:'400'}}
                hint="kd"
          />

          <Separator style={{ marginBottom:20 }}/>

          <Button title="Bed"
                  type="bedroomsArr"
                  icon ="bed"
                  incrementText = "+"
                  decrementText = "-"
                  onIncrementDecrement = {onIncrementDecrement}
                  titleStyle={{}}
                  ranges={bedroomsArr}
                  selected = {bedroom}
          />

          <Separator style={{ marginTop:20,marginBottom:20 }}/>

          <Button title="Bath"
                  type="bathroomsArr"
                  icon ="bath"
                  incrementText = "+"
                  decrementText = "-"
                  onIncrementDecrement = {onIncrementDecrement}
                  titleStyle={{}}
                  ranges={bathroomsArr}
                  selected = {bathroom}
          />

          <Separator style={{ marginTop:20,marginBottom:20 }}/>

          <Button title="Parking"
                  type="parkingArr"
                  icon ="car"
                  incrementText = "+"
                  decrementText = "-"
                  onIncrementDecrement = {onIncrementDecrement}
                  titleStyle={{}}
                  ranges={parkingArr}
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
    backgroundColor:Colors.tomato,
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