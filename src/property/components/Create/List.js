/**
 * @flow
 */
import React, {PropTypes, Component} from "react";
import {ScrollView,View, StyleSheet, Text, Image, ListView, TouchableHighlight} from "react-native";
import Colors from "../../../../Components/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class List extends Component {

  static propTypes = {
    path:PropTypes.string.isRequired,
    index:PropTypes.string.isRequired,
    updateListing: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(item) {
    const {updateListing,path,index} = this.props;
    return (
      <View key={item} >
        <TouchableHighlight onPress={()=>updateListing(path,index,item)} underlayColor="transparent">
          <View style={styles.row}>
            <Text style={styles.title}>{item}</Text>
            <Ionicons name="ios-arrow-forward" color={Colors.smokeGreyLight} size={30} />
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
      </View>
    )
  }

  render() {
    const {collection,header} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = ds.cloneWithRows(collection);

    return (
      <View style={styles.container}>

        {header}
        <View style={styles.menuContainer}>
          <ListView
            dataSource={dataSource}
            style={styles.list}
            enableEmptySections={true}
            renderRow={this.renderRow}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            contentInset={{ bottom: 50}}
          />
        </View>
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    paddingTop:64,
    backgroundColor:Colors.smokeGreyLight
  },
  menuContainer:{
    justifyContent:'flex-end'
  },
  descriptionContainer:{
    flex:1,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
  },
  description:{
    color:Colors.darkGrey,
    fontWeight:'600',
    fontSize:20,
    padding:30,
    textAlign:'center'
  },
  list:{
    padding:10,
    backgroundColor:'white',
  },
  row:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingTop:20,
    paddingBottom:20
  },
  title:{
    flex:1,
    color:'black',
    fontWeight:'600',
    fontSize:16
  },
  stage :{
    color:Colors.darkGrey
  },
  separator:{
    backgroundColor:Colors.lightGrey,
    height:.5
  }
});
