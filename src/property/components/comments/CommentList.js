/*
 @flow
 */
import React, { Component, PropTypes } from "react";
import {
  View,
  ListView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  Image
} from "react-native";

export default class CommentList extends Component {
  static propTypes = {
    collection: PropTypes.array
  };

  renderRow = item => {
    return (
      <View key={item._id} style={styles.rowContainer}>
        <View style={styles.row}>
          <Text style={styles.description}>{item.body}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { collection = [] } = this.props;
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    let dataSource = ds.cloneWithRows(collection);
    return (
      <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
        ref="commentView"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        initialListSize={5}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  rowContainer: {
    flex: 1
  },
  row: {
    flex: 1
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "justify",
    color: "#384760",
    fontFamily: "Avenir-Light"
  }
});
