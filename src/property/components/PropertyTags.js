import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class PropertyTags extends Component {

  static propTypes = {
    tags: PropTypes.array.isRequired
  };

  render() {
    const {tags} = this.props;
    return (
      <View style={styles.container}>
        {
          tags.map((tag,i)=>
            <Text key={i} style={styles.tag}> #{tag} </Text>
          )
        }
      </View>
    );
  }

}

const styles =  StyleSheet.create({
  container : {
    flexDirection:'row',
  },
  tag:{
    color:'gray',
    fontSize:11
  }
});