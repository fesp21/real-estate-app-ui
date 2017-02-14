import React, { PropTypes, Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "./common/actions";
import { SELECTORS } from "./common/selectors";
import UserSingle from "./components/UserSingle";

class UserDetail extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  state = {};

  editUser = () => {
    const { user, navigation, navigator } = this.props;
    return navigation.getNavigator("rootStack").push(
      navigator.router.getRoute("userEdit", {
        user
      })
    );
  };

  render() {
    const { user } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: 64 }}>
        <UserSingle user={user} loadScene={this.editUser} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) };
}

function mapStateToProps(state, props) {
  return {
    user: SELECTORS.getUser(state, props)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
