/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Text, Image,ListView,TouchableHighlight } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../../common/colors';

export default class Button extends Component {

  static propTypes = {
    selected : PropTypes.string.isRequired,
    range:PropTypes.array.isRequired,
    onPress:PropTypes.func.isRequired,
    title:PropTypes.string.isRequired,
    icon:PropTypes.string.isRequired,
  };

  increment = () => {
    const {selected,range} = this.props;
    let arrayIndex,currentValue;
    try {
      arrayIndex = (range.indexOf(selected) + 1) % range.length;
      currentValue = range[arrayIndex];
      this.props.onPress(currentValue);
    } catch (e) {
      console.log('error',e);
    }
  };

  decrement = () => {
    const {selected,range} = this.props;
    let arrayIndex,currentValue;
    try {
      arrayIndex = range.indexOf(selected);
      arrayIndex == 0 ? arrayIndex = range.length : arrayIndex;
      currentValue = range[arrayIndex - 1];
      this.props.onPress(currentValue);
    } catch (e) {
      console.log('error',e);
    }
  };

  render() {

    const {title,titleStyle,selected,icon} = this.props;

    return (
      <View style={styles.container}>
        <Text style={[styles.button]} onPress={()=>this.decrement()}>
          -
        </Text>
        <View style={styles.infoWrapper}>
          <View style={styles.iconWrapper}>
            <FontAwesome name={icon} color="black" size={20} style={styles.icon}/>
            <Text style={[styles.title,titleStyle]}>{title}</Text>
          </View>
          <View style={styles.selected}>
            <Text style={styles.selectedText} >{selected}</Text>
          </View>
        </View>
        <Text style={[styles.button]} onPress={()=>this.increment()}>
          +
        </Text>
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
  infoWrapper:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'yellow'
  },
  title:{
    fontWeight:'400',
    fontSize:12,
  },
  price:{
    fontSize:14
  },
  icon:{
    fontSize:20,
  },
  iconWrapper:{
    // backgroundColor:'white',
    alignItems:'center'
  },
  selected:{
    marginLeft:10,
  },
  selectedText:{
    color:colors.tomato,
    fontWeight:'500',
    // color:'#4c5159'
  },
  button:{
    paddingLeft:10,
    paddingRight:10,
    fontSize:35,
    fontWeight:'200',
    color:'#202226'
  }

});
