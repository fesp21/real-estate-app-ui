/**
 * @flow
 */
import React, { PropTypes, Component } from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Youtube from 'react-native-youtube';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class YoutubePlayer extends Component {
  static propTypes = {
    video: PropTypes.string.isRequired,
    style: View.propTypes.style
  };

  state = {
    isPlaying : false
  };

  onThumbnailPress() {
    return this.setState({
      isPlaying : true
    });
  }

  render() {
    const { video, style, } = this.props;
    const { isPlaying } = this.state;
    const imageThumbnail = `https://img.youtube.com/vi/${video}/hqdefault.jpg`;
    return (
      <View style={[styles.container, style]}>

        {
          isPlaying ?
            <Youtube
              ref="youtubePlayer"
              videoId={video} // The YouTube video ID
              play={isPlaying}           // control playback of video with true/false
              hidden={isPlaying}        // control visiblity of the entire view
              playsInline={false}    // control whether the video should play inline
              loop={false}          // control whether the video should loop when ended
              style={{flex:1, height: 300, width:300,backgroundColor: 'black', marginVertical: 10}}
              rel={0}
              modestbrand={0}
              showinfo={0}
            />
            :
            <TouchableHighlight
              onPress={()=>this.onThumbnailPress()}
              underlayColor="transparent"
            >
              <Image source={{uri:imageThumbnail}} style={styles.thumbnailImage} resizeMode="contain"/>
            </TouchableHighlight>

        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor:'white',
    alignItems:'center'
  },
  videoPlayer: {
    width: 225,
    height: 225,
    alignSelf: "center",
    backgroundColor:'white',
  },
  removeButton: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "transparent",
    marginLeft: 55
  },
  thumbnailImage:{
    width:250,
    height:250
  }
});
