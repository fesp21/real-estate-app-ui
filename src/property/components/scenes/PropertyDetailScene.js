/**
 @flow
 */
import React, { Component, PropTypes } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
  Image,
  KeyboardAvoidingView
} from "react-native";
import PropertyIcons from "../PropertyIcons";
import PropertyTags from "../PropertyTags";
import CommentList from "../comments/CommentList";
import CommentAdd from "../comments/CommentAdd";
import Heart from "../Heart";
import colors from "../../../common/colors";
import PropertyMap from "../PropertyMap";
import YoutubePlayer from './../../../components/YoutubePlayer';

export default class PropertySingle extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    saveComment: PropTypes.func.isRequired,
    commentBody: PropTypes.string.isRequired,
    onChangeCommentText: PropTypes.func.isRequired,
    handleFavoritePress: PropTypes.func.isRequired,
    loadProfile: PropTypes.func.isRequired,
    followLocation: PropTypes.func.isRequired
  };

  render() {
    const {
      item,
      saveComment,
      commentBody,
      onChangeCommentText,
      handleFavoritePress,
      loadProfile,
      showSlider,
      followLocation
    } = this.props;

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="position">

          <TouchableHighlight
            onPress={() => showSlider()}
            underlayColor="transparent"
          >
            <Image source={{ uri: item.images[0] }} style={styles.image} />
          </TouchableHighlight>

          <View style={styles.content}>


            <Text style={styles.title}>{item.title}</Text>

            <View
              style={{
            flex: 1,
            flexDirection: "row",
            alignItems:'center'
          }}
            >

              <View style={{ flex: 2 }}>

                <PropertyTags items={item.tags || ["Laundry", "Swimming Pool"]} />

                <PropertyIcons
                  services={item.meta || []}
                  items={["bedroom", "bathroom", "parking"]}
                />

                <Text style={styles.lightText}>Uploaded 3 days ago</Text>

              </View>

              <View style={{ flex: 1 }}>

                <View
                  style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
              }}
                >

                  <Text style={styles.price}>{item.price}KD</Text>

                  <Heart
                    handleFavoritePress={() => handleFavoritePress(item)}
                    isFavorited={item.isFavorited}
                  />

                </View>

                <Text style={[styles.lightText, { textAlign: "center" }]}>
                  256 views
                </Text>

              </View>

            </View>

            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.label}>By</Text>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => loadProfile(item.user)}
                style={{ flex: 1 }}
              >
                <Text style={styles.username}> {item.user.name} </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.separator} />

            <View>
              <Text style={styles.descTitle}>Description</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            <PropertyMap
              address={item.address}
              followLocation={followLocation}
            />

            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={[styles.descTitle, { marginBottom: 10 }]}>
                Amenities
              </Text>
              {item.amenities.map(amenity => (
                <Text key={amenity} style={styles.amenity}>{amenity}</Text>
              ))}
            </View>

            <View style={styles.separator} />

            {
              item.video &&
              <YoutubePlayer video={item.video} />
            }

            <View style={styles.separator} />

            <View>
              <Text style={styles.descTitle}>Comments</Text>
              <CommentList collection={item.comments} />
              <CommentAdd
                saveComment={saveComment}
                commentBody={commentBody}
                onChangeCommentText={onChangeCommentText}
              />
            </View>

          </View>

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 64,
    width: Dimensions.get("window").width
  },
  content: {
    flex: 1,
    margin: 10
  },
  image: {
    width: Dimensions.get("window").width,
    height: 200
  },
  tags: {
    marginTop: 10,
    flexDirection: "row"
  },
  icons: {
    marginTop: 10,
    flexDirection: "row"
  },
  title: {
    color: "#2c2d30",
    fontWeight: "600",
    marginBottom: 10
  },
  descTitle: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#2c2d30"
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "justify",
    color: "#384760",
    fontFamily: "Avenir-Light"
  },
  separator: {
    marginTop: 10,
    height: 0.5,
    backgroundColor: "#cbced3"
  },
  amenity: {
    fontSize: 15,
    textAlign: "justify",
    color: "#384760",
    fontFamily: "Avenir-Light"
  },
  username: {
    color: colors.darkGrey
  },
  label: {
    color: colors.grey,
    fontSize: 12
  },
  price: {
    fontSize: 17,
    color: "#2c2d30",
    margin: 10,
    fontWeight: "600"
  },
  lightText: {
    color: colors.fadedBlack,
    fontWeight: "100",
    fontSize: 12
  }
});
