import React, { PropTypes,Component } from 'react';
import { ScrollView,StyleSheet, View, Dimensions,Image,Text } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { SELECTORS } from './selectors';
import UserEditScene from './Components/UserEditScene';
import NavBack from './../../Components/NavBack';
import Done from './../../Components/Done';

class UserEdit extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired
  };

  static route = {
    navigationBar : {
      renderBackground: (props) => <View style={{height: 64,backgroundColor:'white',opacity:0.8}}/>,
      renderLeft: (props) => <NavBack icon="ios-close" />,
      renderRight: (route) => {
        const { config: { eventEmitter }  } = route;
        return (
          <Done emitter={eventEmitter}
                visible={true}
                title = "Save"
          />
        );
      },
    }
  };

  componentWillMount() {
    this._subscription = this.props.route.getEventEmitter().addListener('reset', this.handleReset);
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  state = {
  };

  handleReset = () => {
    console.log('done');
  };

  editUser = () => {
    const {user,navigation,navigator} = this.props;
    return navigation.getNavigator('rootStack').push(navigator.router.getRoute('userEdit',{
      user
    }));

  };

  pickImage = () => {

  };

  render() {
    const {user} = this.props;
    return (

      <UserEditScene
        user={user}
        loadScene={this.pickImage}
      />

    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...ACTIONS }, dispatch) }
}

function mapStateToProps(state) {
  return {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:64,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(UserEdit);