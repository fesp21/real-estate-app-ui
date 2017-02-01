import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Colors from './../../../../common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import isNull from 'lodash/isNull';

export default class NavBack extends React.Component {

  goBack() {
    this.props.emitter.emit('goBack');
  }

  render() {
    const { style, text, icon, stage } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {!isNull(stage) && stage > 1 &&
        <TouchableHighlight
          style={styles.container}
          onPress={() => { this.goBack(); }} underlayColor="transparent"
        >
          {icon ? <Ionicons name={icon} size={33} color="white" style={[styles.icon]} /> :
          <Text style={[styles.title, style]}>{text}</Text> }
        </TouchableHighlight>
        }
      </View>
    );
  }
}

NavBack.propTypes = {
  text: React.PropTypes.string,
  icon: React.PropTypes.string,
  // style: React.PropTypes.object,
  stage: React.PropTypes.number,
  emitter: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 10,
  },
  title: {
    color: Colors.tomato,
    fontSize: 15,
  },
  icon: {
    width: 13,
    height: 33,
    alignSelf: 'center',
    color: Colors.white,
  },
});

