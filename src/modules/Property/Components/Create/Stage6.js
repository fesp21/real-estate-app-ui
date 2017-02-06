/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { ScrollView, View, StyleSheet, Text, Image,ListView,TouchableHighlight,TextInput,KeyboardAvoidingView } from 'react-native';
import Colors from '../../../../Components/Colors';

export default class Stage6 extends Component {

  static propTypes = {
    attributes:PropTypes.object.isRequired,
    path:PropTypes.string.isRequired
  };

  state = {
    descriptionHeight:0
  };

  render() {
    const {onFieldChange,path,attributes,header,footer} = this.props;
    const {title,description,price} = attributes;

    return (
      <View style={{flex:1,paddingTop:64}}>

        <ScrollView style={styles.container}
                    contentInset={{bottom:100}}
        >

          <KeyboardAvoidingView
            behavior='position'
          >
            {header}

            <View style={styles.menuContainer}>

              <Text style={styles.label}>Give a Title for your Property </Text>
              <TextInput
                style={[styles.textInput]}
                onChangeText={(value) => onFieldChange(path,'title',value)}
                value={title}
                maxLength={50}
                placeholderTextColor={Colors.lightGrey}
                placeholder="Ex: Beautiful 2 bedrooms Apartment in Salwa"
              />

              <View style={styles.separator}/>

              <Text style={styles.label}>Describe your Property</Text>
              <TextInput
                style={[styles.textInput,{ paddingVertical:5, height: Math.max(40, this.state.descriptionHeight) }]}
                onChange={(event) => {
                  this.setState({
                    text: event.nativeEvent.text,
                    descriptionHeight: event.nativeEvent.contentSize.height + 10,
                  });
                }}
                multiline={true}
                onChangeText={(value) => onFieldChange(path,'description',value)}
                value={description}
                maxLength={1000}
                placeholderTextColor={Colors.lightGrey}
                placeholder="Description"
                enablesReturnKeyAutomatically={true}
                returnKeyType="done"
              />

              <View style={styles.separator}/>

              <Text style={styles.label}>Price</Text>
              <TextInput
                style={[styles.textInput]}
                onChangeText={(value) => onFieldChange(path,'price',value)}
                value={price}
                maxLength={6}
                placeholderTextColor={Colors.lightGrey}
                placeholder="Ex: 200 "
                keyboardType='numeric'
              />

            </View>
          </KeyboardAvoidingView>

        </ScrollView>
        {footer}
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:Colors.smokeGreyLight,
  },
  menuContainer:{
    padding:10,
    paddingVertical:30,
    backgroundColor:'white',
  },
  image : {
    width:150,
    height:150,
  },
  label: {
    fontSize: 14,
    color: Colors.darkGrey,
    marginBottom:5,
    fontWeight:'100'
  },
  textInput:{
    flex:1,
    height:40,
    paddingHorizontal:5,
    borderColor:Colors.smokeGreyLight,
    borderRadius:2,
    borderWidth:1,
    fontSize:16,
    color:Colors.darkGrey,
    fontWeight:'100'
  },
  separator:{
    flex:1,
    height:.5,
    backgroundColor:Colors.lightGrey,
    marginVertical:15
  },


});
