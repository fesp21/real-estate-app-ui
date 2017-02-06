/**
 * @flow
 */
import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Text, Image,ListView,TouchableHighlight } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../../Components/Colors';

export default class Stage5 extends Component {

  static propTypes = {
    pickImage : PropTypes.func.isRequired,
    images:PropTypes.array.isRequired
  };

  componentDidMount() {
    const {images} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = ds.cloneWithRows(images);
  }

  renderRow(image,key) {
    return (
      <View style={styles.row}>
        <Image key={key} source={{uri:image}} style={styles.image}/>
      </View>
    )
  }

  render() {
    const {images,pickImage,header,footer} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = ds.cloneWithRows(images);

    return (
      <View style={styles.container}>

        {header}

        <TouchableHighlight style={styles.cameraIcon} onPress={()=>pickImage()} underlayColor="transparent">
          <FontAwesome
            name="camera"
            size={100}
            color={Colors.white}
          />
        </TouchableHighlight>

        <View style={styles.menuContainer}>

          <ListView
            dataSource={dataSource}
            contentContainerStyle={styles.contentContainer}
            style={styles.listStyle}
            enableEmptySections={true}
            renderRow={this.renderRow}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            contentInset={{ bottom: 50}}
          />

        </View>

        {
          images.length >= 0 && footer
        }

      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container : {
    flex:1,
    paddingTop:64,
    backgroundColor:Colors.smokeGreyLight,
  },
  contentContainer:{
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuContainer:{
    flex:3,
    padding:10,
    backgroundColor:'white'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 150,
    height: 150,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  cameraIcon:{
    flex:1,
    alignItems:'center',
    paddingBottom:20,
  },
  image : {
    width:125,
    height:125,
  },


});
