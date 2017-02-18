/**
 * @flow
 */
import React, { PropTypes, Component } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Youtube from 'react-native-youtube';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class YoutubePlayer extends Component {
  static propTypes = {
    video: PropTypes.string.isRequired,
    style: View.propTypes.style
  };

  render() {
    const { video, style, } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Youtube
          ref="youtubePlayer"
          videoId={video} // The YouTube video ID
          play={false}           // control playback of video with true/false
          hidden={true}        // control visiblity of the entire view
          playsInline={false}    // control whether the video should play inline
          loop={false}          // control whether the video should loop when ended
          style={{flex:1, height: 300, width:300,backgroundColor: 'black', marginVertical: 10}}
          modestbranding={true}
          showInfo={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  videoPlayer: {
    width: 225,
    height: 225,
    alignSelf: "center"
  },
  removeButton: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "transparent",
    marginLeft: 55
  }
});
