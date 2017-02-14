import React, { PropTypes, Component } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import UserInfo from "./UserInfo";
import UserLogo from "./UserLogo";
import Contact from "./Contact";
import PropertyListScene
  from "../../../property/components/scenes/PropertyListScene";
import { TabViewAnimated, TabBar } from "react-native-tab-view";
import colors from "../../../common/colors";

export default class UserProfile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    properties: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    loadEntity: PropTypes.func.isRequired,
    onImagePress: PropTypes.func.isRequired,
    handleFavoritePress: PropTypes.func.isRequired,
    fetchProperties: PropTypes.func.isRequired
  };

  state = {
    index: 0,
    routes: [
      { key: "1", title: "Basic Info" },
      { key: "2", title: "Properties" },
      { key: "3", title: "Contact" },
      { key: "4", title: "Reviews" }
    ]
  };

  constructor() {
    super();
    this.loadEntity = this.loadEntity.bind(this);
    this.onImagePress = this.onImagePress.bind(this);
    this.handleFavoritePress = this.handleFavoritePress.bind(this);
    this.fetchProperties = this.fetchProperties.bind(this);
    this.handleFavoritePress = this.handleFavoritePress.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  handleFavoritePress(item: object) {
    this.props.actions.favoriteProperty(item);
  }

  loadEntity(item: object) {
    const { navigator } = this.props;
    navigator.push(
      navigator.router.getRoute("propertyDetail", {
        property: item
      })
    );
  }

  fetchProperties() {
    this.props.actions.fetchProperties();
  }

  onImagePress(item: object) {
    const now = new Date().getTime();
    var delta = now - this.state.lastImagePress;

    if (delta < DOUBLE_PRESS_DELAY) {
      // favorite item
      this.handleFavoritePress(item);
    }
    this.setState({ lastImagePress: now });
  }

  handleChangeTab(index) {
    this.setState({ index });
  }

  renderHeader(props) {
    return (
      <TabBar
        {...props}
        tabStyle={styles.tabStyle}
        scrollEnabled
        indicatorStyle={styles.indicator}
        labelStyle={styles.label}
      />
    );
  }

  renderScene({ route }) {
    const {
      user,
      properties,
      isFetching,
      loadEntity,
      onImagePress,
      handleFavoritePress,
      fetchProperties
    } = this.props;
    switch (route.key) {
      case "1":
        return <UserInfo user={user} />;
      case "2":
        return (
          <View>
            <PropertyListScene
              collection={properties}
              loadEntity={loadEntity}
              onImagePress={onImagePress}
              handleFavoritePress={handleFavoritePress}
              isFetching={isFetching}
              fetchProperties={fetchProperties}
              horizontal={true}
            />
          </View>
        );
      case "3":
        return <Contact user={user} />;
      default:
        return null;
    }
  }

  render() {
    const { user } = this.props;

    return (
      <ScrollView style={{ flex: 1 }}>
        <UserLogo user={user} />
        <TabViewAnimated
          style={styles.tabContainer}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.handleChangeTab}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1
  },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabStyle: {
    backgroundColor: colors.primary
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.darkGrey,
    textAlign: "center",
    paddingVertical: 20
  },
  indicator: {
    backgroundColor: "#ffeb3b"
  },
  label: {
    color: "#fff",
    fontWeight: "400"
  },
  tabbar: {
    backgroundColor: "#222"
  }
});
