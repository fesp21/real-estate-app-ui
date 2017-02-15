/**@flow*/

import React, { PropTypes, Component } from "react";
import { View, ActionSheetIOS, Linking } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "./common/actions";
import { SELECTORS } from "./common/selectors";
import PropertyDetailScene from "./components/scenes/PropertyDetailScene";

class PropertyDetail extends Component {
  static propTypes = {
    property: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    commentBody: ""
  };

  saveComment() {
    // console.log('saving comment',this.state.commentBody);
  }

  onChangeCommentText = value => {
    return this.setState({ commentBody: value });
  };

  handleFavoritePress = (item: object) => {
    this.props.actions.favoriteProperty(item);
  };

  loadProfile = (user: object) => {
    const { navigator } = this.props;
    return navigator.push(
      navigator.router.getRoute("profile", {
        user
      })
    );
  };

  showSlider = () => {
    const { property } = this.props;
    // navigator.push(navigator.router.getRoute('propertyFilters'));
    let navigator = this.props.navigation.getNavigator("rootStack");
    return navigator.push(
      navigator.router.getRoute("propertySlideShow", {
        images: property.images
      })
    );
  };

  followLocation = () => {
    const { property } = this.props;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: `${property.title}`,
        options: ["Open in Apple Maps", "Open in Google Maps", "Cancel"],
        destructiveButtonIndex: -1,
        cancelButtonIndex: 2
      },
      buttonIndex => {
        this.openMaps(property, buttonIndex);
      }
    );
  };

  openMaps(property, buttonIndex) {
    var address = encodeURIComponent(
      `${property.address.city},${property.address.state},${property.address.country}`
    );
    switch (buttonIndex) {
      case 0:
        Linking.openURL(
          `http://maps.apple.com/?dll=${property.address.latitude},${property.address.longitude}`
        );
        break;
      case 1:
        const nativeGoogleUrl = `comgooglemaps://?daddr=${property.address.latitude},${property.address.longitude}&center=${property.address.latitude},${property.address.longitude}&zoom=14&views=traffic&directionsmode=driving`;
        Linking.canOpenURL(nativeGoogleUrl).then(supported => {
          const url = supported
            ? nativeGoogleUrl
            : `http://maps.google.com/?q=loc:${property.address.latitude}+${property.address.longitude}`;
          Linking.openURL(url);
        });
        break;
    }
  }

  render() {
    const { property, comments } = this.props;
    return (
      <PropertyDetailScene
        item={property}
        comments={comments}
        saveComment={this.saveComment}
        commentBody={this.state.commentBody}
        onChangeCommentText={this.onChangeCommentText}
        handleFavoritePress={this.handleFavoritePress}
        loadProfile={this.loadProfile}
        showSlider={this.showSlider}
        followLocation={this.followLocation}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) };
}

function mapStateToProps(state, props) {
  return {
    comments: SELECTORS.fetchComments(state, props),
    property: SELECTORS.fetchProperty(state, props)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetail);
