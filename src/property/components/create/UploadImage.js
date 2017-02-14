/**
 * @flow
 */
import React, { PropTypes, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ListView,
  TouchableHighlight
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../../../common/colors";
import ImagePicker from "react-native-image-crop-picker";
import map from "lodash/map";

export default class UploadImage extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    updateImage: PropTypes.func.isRequired
  };

  pickImage = () => {
    const uploadedImages = this.props.images;
    const maxImages = 5;

    ImagePicker
      .openPicker({
        multiple: true
      })
      .then(collection => {
        return map(collection, image => image.path);
      })
      .then(images => {
        if (uploadedImages.length >= maxImages) return;
        let allowedImages = [];
        let i = 1;
        images.forEach(image => {
          if (i + uploadedImages.length <= maxImages) {
            allowedImages.push(image);
          }
          i++;
        });
        return allowedImages;
      })
      .then(pendingImages => this.props.updateImage(pendingImages))
      .catch(e => {});
  };

  removeImage = removedImage => {
    this.props.updateImage(removedImage);
  };

  renderRow = (image, key) => {
    return (
      <View style={styles.row}>
        <TouchableHighlight
          onPress={() => this.removeImage(image)}
          underlayColor="transparent"
          style={{
            position: "absolute",
            zIndex: 1000,
            marginTop: -10,
            marginLeft: -10
          }}
        >
          <FontAwesome
            name="close"
            style={{
              backgroundColor: "transparent"
            }}
            color="red"
            size={25}
          />

        </TouchableHighlight>
        <View style={{ flex: 1 }}>
          <Image key={key} source={{ uri: image }} style={styles.image} />
        </View>
      </View>
    );
  };

  render() {
    const { images, header, footer } = this.props;

    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    let dataSource = ds.cloneWithRows(images);

    return (
      <View style={styles.container}>

        {header}

        <TouchableHighlight
          style={styles.cameraIcon}
          onPress={() => this.pickImage()}
          underlayColor="transparent"
        >
          <FontAwesome name="camera" size={100} color={colors.white} />
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
            contentInset={{ bottom: 50 }}
          />

        </View>

        {images.length > 0 && footer}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: colors.smokeGreyLight
  },
  contentContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  menuContainer: {
    flex: 3,
    padding: 10,
    backgroundColor: "white"
  },
  row: {
    justifyContent: "center",
    padding: 5,
    margin: 10,
    width: 150,
    height: 150,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#CCC"
  },
  cameraIcon: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20
  },
  image: {
    width: 125,
    height: 125
  }
});
