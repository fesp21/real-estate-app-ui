import React, { PropTypes,Component } from 'react';
import { ScrollView,StyleSheet, View, Dimensions,Image } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ACTIONS } from './actions';
import { SELECTORS } from './selectors';
import UserSingle from './Components/UserSingle';

class UserEdit extends Component {

  static propTypes = {
    user:PropTypes.object.isRequired
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
      <View style={{flex:1,paddingTop:64,backgroundColor:'green'}}>
      </View>
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
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(UserEdit);