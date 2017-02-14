/**
 * @flow
 */
import React, { PropTypes, Component, PureComponent } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "./common/actions";
import { SELECTORS } from "./common/selectors";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import PropertyListScene from "./components/scenes/PropertyListScene";

class PropertyList extends Component {
  state = {
    lastImagePress: 0
  };

  static propTypes = {
    properties: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  static route = {
    navigationBar: {
      renderLeft: props => <SearchBar {...props} />,
      renderRight: props => <MapView {...props} />
    }
  };

  componentDidMount() {
    this.props.actions.fetchProperties();
  }

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
    const DOUBLE_PRESS_DELAY = 300;

    let delta = now - this.state.lastImagePress;

    if (delta < DOUBLE_PRESS_DELAY) {
      // favorite item
      this.handleFavoritePress(item);
    }
    this.setState({ lastImagePress: now });
  };

  handleFavoritePress = (item: object) => {
    this.props.actions.favoriteProperty(item);
  };

  render() {
    const { properties, isFetching } = this.props;

    return (
      <View style={styles.container}>
        {!isFetching &&
          properties.length == 0 &&
          <View
            style={{
              padding: 10,
              backgroundColor: "white",
              alignItems: "center"
            }}
          >
            <Text>No Results</Text>
          </View>}
        <PropertyListScene
          collection={properties}
          loadEntity={this.loadEntity}
          onImagePress={this.onImagePress}
          handleFavoritePress={this.handleFavoritePress}
          isFetching={isFetching}
          fetchProperties={this.fetchProperties}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  }
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) };
}

function mapStateToProps(state) {
  return {
    properties: SELECTORS.fetchProperties(state),
    isFetching: SELECTORS.isFetching(state)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
