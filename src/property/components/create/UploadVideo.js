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
import Video from "react-native-video";

export default class UploadVideo extends Component {
  static propTypes = {
    updateVideo: PropTypes.func.isRequired
  };

  state = {
    media: null
  };

  pickVideo = () => {
    ImagePicker
      .openPicker({
        smartAlbums: ["Videos"]
      })
      .then(media => {
        this.setState({
          media: media
        });
      });
  };

  removeVideo = video => {
    // this.props.updateVideo(video);
  };

  render() {
    const { header, footer } = this.props;

    return (
      <View style={styles.container}>

        {header}

        <TouchableHighlight
          style={styles.cameraIcon}
          onPress={() => this.pickVideo()}
          underlayColor="transparent"
        >
          <FontAwesome name="video-camera" size={100} color={colors.white} />
        </TouchableHighlight>

        <View style={styles.menuContainer}>
          {this.state.media &&
            <Video
              source={this.state.media} // Can be a URL or a local file.
              ref={ref => {
                this.player = ref;
              }} // Store reference
              rate={1.0} // 0 is paused, 1 is normal.
              volume={1.0} // 0 is muted, 1 is normal.
              muted={false} // Mutes the audio entirely.
              paused={false} // Pauses playback entirely.
              resizeMode="cover" // Fill the whole screen at aspect ratio.*
              repeat={true} // Repeat forever.
              playInBackground={false} // Audio continues to play when app entering background.
              playWhenInactive={false} // [iOS] Video continues to play when control or notification center are shown.
              progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
              onProgress={this.setTime} // Callback every ~250ms with currentTime
              onEnd={this.onEnd} // Callback when playback finishes
              onBuffer={this.onBuffer} // Callback when remote video is buffering
              style={styles.video}
            />}

        </View>

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
  },
  video: {
    flex: 1,
    height: 200,
    width: 300
  }
});
