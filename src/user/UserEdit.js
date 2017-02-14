import React, { PropTypes, Component } from "react";
import {
  View,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACTIONS } from "./common/actions";
import UserEditScene from "./components/UserEditScene";
import NavBack from "../components/NavBack";
import Done from "../components/Done";
import ImagePicker from "react-native-image-crop-picker";
import { SELECTORS } from "./common/selectors";

class UserEdit extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  state = {
    uploaded: false,
    image: null,
    name: null,
    company: {
      address: null,
      description: null
    }
  };

  static route = {
    navigationBar: {
      renderBackground: props => (
        <View style={{ height: 64, backgroundColor: "white", opacity: 0.8 }} />
      ),
      renderLeft: props => <NavBack icon="ios-close" />,
      renderRight: route => {
        const { config: { eventEmitter } } = route;
        return <Done emitter={eventEmitter} visible={true} title="Save" />;
      }
    }
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      image: user.image,
      name: user.name
    });
    if (user.isCompany) {
      this.setState({
        company: {
          address: user.company.address,
          description: user.company.description
        }
      });
    }
  }

  componentWillMount() {
    this._subscription = this.props.route
      .getEventEmitter()
      .addListener("reset", this.onSave);
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  onFieldChange = (key, value) => {
    switch (key) {
      case "address":
      case "description":
        this.setState({
          company: {
            ...this.state.company,
            [key]: value
          }
        });
        break;
      default:
        this.setState({
          [key]: value
        });
    }
  };

  pickImage = () => {
    ImagePicker
      .openPicker({
        multiple: false
      })
      .then(image => {
        this.setState({
          image: image.path,
          uploaded: true
        });
      })
      .catch(e => {});
  };

  onSave = () => {
    this.props.actions.updateUser(this.state);
    this.props.navigator.pop();
  };

  render() {
    const { user } = this.props;
    return (
      <UserEditScene
        {...this.state}
        user={user}
        pickImage={this.pickImage}
        onFieldChange={this.onFieldChange}
        onSave={this.onSave}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
