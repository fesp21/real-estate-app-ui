/**
 * @flow
 */
import React from 'react';
import { ScrollView, View, StyleSheet, Text, Image,ListView,TouchableHighlight,TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from './../../../../common/Colors';

export default class Stage7 extends React.Component {

  state = {
    descriptionHeight:40,
    disabled:true
  };
  // render() {
  //   const {header,footer,amenities} = this.props;
  //
  //   console.log('amenities',amenities);
  //   return (
  //     <View style={{flex:1,paddingTop:64}}>
  //
  //       <ScrollView style={styles.container} contentInset={{bottom:100}}>
  //
  //         {header}
  //
  //         <View style={styles.menuContainer}>
  //
  //           <TouchableHighlight style={{flex:1}} onPress={()=>alert('wa')} underlayColor="#E7E7E7" activeOpacity={0.2}>
  //             <View style={styles.row}>
  //               <Text style={styles.title} >Central AC</Text>
  //               <View style={styles.checkbox}>
  //                 <FontAwesome name="check" size={16} color={Colors.green}/>
  //               </View>
  //             </View>
  //           </TouchableHighlight>
  //
  //           <View style={styles.separator}/>
  //
  //           <TouchableHighlight style={{flex:1}} onPress={()=>alert('wa')} underlayColor="#E7E7E7" activeOpacity={0.2}>
  //             <View style={styles.row}>
  //               <Text style={styles.title} >Swimming Pool</Text>
  //               <View style={styles.checkbox}>
  //               </View>
  //             </View>
  //           </TouchableHighlight>
  //
  //
  //         </View>
  //
  //       </ScrollView>
  //
  //       {footer}
  //
  //     </View>
  //   )
  // }
  renderRow = (item) => {
    const {updateListing,selected} = this.props;
    return (
      <View key={item} >
        <TouchableHighlight style={{flex:1}} onPress={()=>updateListing(item)} underlayColor="transparent" >
          <View style={styles.row}>
            <Text style={styles.title} >{item}</Text>
            <View style={styles.checkbox}>
              { selected.includes(item) && <FontAwesome name="check" size={16} color={Colors.green}/> }
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
      </View>
    )
  }

  render() {
    const {collection,header,footer} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = ds.cloneWithRows(collection);

    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          {header}
        </View>
        <View style={{flex:5}}>
          <ListView
            dataSource={dataSource}
            style={styles.list}
            enableEmptySections={true}
            renderRow={this.renderRow}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            contentInset={{ bottom: 50}}
            renderHeader={()=><View/>}
          />
        </View>
        {footer}
      </View>
    );
  }
}

Stage7.prototypes = {
  collection:React.PropTypes.array.isRequired,
  updateListing:React.PropTypes.func.isRequired,
  selected:React.PropTypes.array.isRequired
};

const styles =  StyleSheet.create({
  container : {
    flex:1,
    paddingTop:64
  },
  menuContainer:{
    flex:1,
    backgroundColor:Colors.smokeGreyLight,
    paddingHorizontal:10,
    paddingVertical:30,
  },
  list:{
    flex:1,
    padding:10
  },
  row :{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  title:{
    flex:1,
    fontWeight:'100',
    color:Colors.darkGrey
  },
  separator:{
    flex:1,
    height:.5,
    backgroundColor:Colors.lightGrey,
    marginVertical:10,
  },
  checkbox:{
    width:24,
    height:24,
    borderRadius:12,
    borderColor:Colors.smokeGreyDark,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:10,
  }

});
