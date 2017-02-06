/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Text, Image,ListView,TouchableHighlight,Dimensions } from 'react-native';
import Colors from '../../../../Components/Colors';

export default class List extends Component {

  static propTypes = {
    selected : PropTypes.string.isRequired,
    onSelect:PropTypes.func.isRequired,
    ranges:PropTypes.array.isRequired,
    title:PropTypes.string.isRequired,
    hint:PropTypes.string,
  };

  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(item) {
    const {onSelect,selected,hint} = this.props;
    return (
      <View style={styles.row}>
        <TouchableHighlight onPress={() => {onSelect(item)}} underlayColor="transparent">
          <Text style={[styles.price, selected == item && {color:Colors.tomato,fontWeight:'500'}]}>{item}{item !='Any' && hint} </Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {

    const {ranges,title,titleStyle} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = ds.cloneWithRows(ranges);

    return (
      <View style={styles.container}>
        <Text style={[styles.title,titleStyle]}>{title}</Text>
        <ListView
          dataSource={dataSource}
          contentContainerStyle={styles.contentContainer}
          style={styles.listStyle}
          horizontal={true}
          enableEmptySections={true}
          renderRow={this.renderRow}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    justifyContent:'center',
  },
  contentContainer:{
    justifyContent:'center',
    flexDirection:'row',
    flexWrap:'wrap',
    paddingVertical:10,
  },
  row: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    margin:10,
    marginRight: 20,
    marginLeft: 20,
  },
  listStyle:{
    flex:1,
    flexDirection:'row'
  },
  title:{
    justifyContent:'center',
    textAlign:'center',
    fontWeight:'600',
    fontSize:14
  },
  price:{
    fontSize:14
  }

});
