import React, { PropTypes,Component } from 'react';
import { ScrollView,StyleSheet, View, Dimensions,Image } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { SELECTORS } from './selectors';
import UserEditScene from './Components/UserEditScene';
import NavBack from './../../Components/NavBack';

class UserEdit extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired
  };

  static route = {
    navigationBar : {
      // visible:false,
      renderBackground: (props) => <View style={styles.navBar}/>,
      renderLeft: (props) => <NavBack icon="ios-close" />
    }
  };

  state = {
  };

  editUser = () => {
    const {user,navigation,navigator} = this.props;
    return navigation.getNavigator('rootStack').push(navigator.router.getRoute('userEdit',{
      user
    }));

  };

  render() {
    const {user} = this.props;
    return (

      <UserEditScene
        user={user}
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
  navBar: {
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor:'white',
    opacity:0.8
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(UserEdit);