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
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  RefreshControl
} from "react-native";
import PropertyIcons from "../PropertyIcons";
import PropertyTags from "../PropertyTags";
import Swiper from "react-native-swiper";
import Heart from "../Heart";
import colors from "../../../common/colors";

export default class PropertyListScene extends Component {
  static propTypes = {
    collection: PropTypes.array.isRequired,
    loadEntity: PropTypes.func.isRequired,
    onImagePress: PropTypes.func.isRequired,
    handleFavoritePress: PropTypes.func.isRequired,
    horizontal: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
  }

  imageSlider(item, image) {
    const { onImagePress } = this.props;
    return (
      <TouchableWithoutFeedback
        key={image}
        onPress={() => onImagePress(item)}
        underlayColor="transparent"
        style={{ flex: 1 }}
      >
        <View style={styles.slide}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderRow(item) {
    const { loadEntity, handleFavoritePress, horizontal } = this.props;

    return (
      <View style={[styles.row]}>

        <TouchableHighlight
          onPress={() => loadEntity(item)}
          underlayColor="transparent"
        >
          <Text style={styles.title}>{item.title}</Text>
        </TouchableHighlight>

        {horizontal
          ? this.imageSlider(item, item.images[0])
          : <Swiper
              loadMinimal
              loadMinimalSize={1}
              style={styles.wrapper}
              height={180}
              loop={false}
            >
              {item.images.map((image, i) => this.imageSlider(item, image, i))}
            </Swiper>}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems:'center',
            padding:5
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

        <View style={styles.separator} />

      </View>
    );
  }

  render() {
    const { collection, isFetching, fetchProperties, horizontal } = this.props;
    let dataSource = this.ds.cloneWithRows(collection);

    // renderFooter={() =>
    // isFetching &&
    // <LoadingIndicator
    //   isFetching={isFetching}
    //   style={{ backgroundColor: "white" }}
    // />}

    return (
      <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
        ref="listView"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        initialListSize={100}
        horizontal={horizontal && true}
        onEndReached={() => fetchProperties()}
        onEndReachedThreshold={10}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  row: {
    flex: 1
  },
  title: {
    flex: 1,
    color: "#2c2d30",
    margin: 10,
    fontWeight: "600"
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: 188
  },
  separator: {
    marginHorizontal: 10,
    height: 0.5,
    backgroundColor: colors.lightGrey
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  loadingView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.5)"
  },
  price: {
    fontWeight: "600",
    fontSize: 16
  },
  loadingImage: {
    width: 60,
    height: 60
  },
  lightText: {
    color: colors.fadedBlack,
    fontWeight: "100",
    fontSize: 12
  }
});
