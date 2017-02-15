import React, { PropTypes, Component } from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "./common/actions";
import { ACTIONS as PROPERTY_ACTIONS } from "../property/common/actions";
import { SELECTORS } from "./common/selectors";
import { SELECTORS as PROPERTY_SELECTORS } from "../property/common/selectors";
import UserProfile from "./components/profile/UserProfile";

const DOUBLE_PRESS_DELAY = 300;

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  static route = {
    navigationBar: {
      renderBackground: props => (
        <View>
          <Image
            style={{flex:1}}
            source={{
              uri: "http://il9.picdn.net/shutterstock/videos/3951179/thumb/1.jpg"
            }}
            resizeMode={"cover"}
          />
        </View>
      )
    }
  };

  state = {
    lastImagePress: ""
  };

  handleFavoritePress = (item: object) => {
    this.props.actions.favoriteProperty(item);
  };

  loadEntity = (item: object) => {
    const { navigator } = this.props;
    navigator.push(
      navigator.router.getRoute("propertyDetail", {
        property: item
      })
    );
  };

  fetchProperties = () => {
    this.props.actions.fetchProperties();
  };

  onImagePress = (item: object) => {
    const now = new Date().getTime();
    let delta = now - this.state.lastImagePress;

    if (delta < DOUBLE_PRESS_DELAY) {
      // favorite item
      this.handleFavoritePress(item);
    }
    this.setState({ lastImagePress: now });
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, paddingTop: 64 }}>
        <UserProfile
          {...this.props}
          loadEntity={this.loadEntity}
          onImagePress={this.onImagePress}
          fetchProperties={this.fetchProperties}
          handleFavoritePress={this.handleFavoritePress}
        />
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...ACTIONS, ...PROPERTY_ACTIONS }, dispatch)
  };
}

function mapStateToProps(state, props) {
  return {
    user: SELECTORS.getUser(state, props),
    properties: PROPERTY_SELECTORS.fetchProperties(state),
    isFetching: state.propertyReducer.isFetching
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
