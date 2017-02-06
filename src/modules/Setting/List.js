/**
 * @flow
 */
import React, { PropTypes, Component, PureComponent } from 'react';
import { ScrollView, StyleSheet, StatusBar, Text, Image,Dimensions, Alert } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { SELECTORS as AUTH_SELECTORS } from './../../modules/Auth/selectors';
import { ACTIONS as AUTH_ACTIONS } from './../../modules/Auth/actions';
import { ACTIONS as PROPERTY_ACTIONS } from './../../modules/Property/actions';
import isEmpty from 'lodash/isEmpty';
import List from './Components/SettingList';
import EditProfile from './Components/EditProfile';

class SettingList extends Component {

  static route = {
    navigationBar: {
      title: () => <Text>Settings</Text>
    },
  };

  loadScene = (route = null) => {
    const { navigator,navigation,user } = this.props;
    switch (route) {
      case 'user':
        return navigator.push(navigator.router.getRoute('userDetail',{
          user
        }));
      case 'propertyCreate':
        return  navigation.performAction(({ tabs, stacks }) => {
          tabs('homeTab').jumpToTab('third');
        });
      case 'login':
        navigation.getNavigator('rootStack').push(navigator.router.getRoute('login',{
          redirectRoute:'settingList'
        }));
        break;
        // return navigator.push(navigator.router.getRoute(route,{redirectRoute:'settingList'}));
      case 'logout': {
        return Alert.alert(
          'Logout ?',
          '',
          [
            {text: 'Cancel'},
            {text: 'OK', onPress: () => {
              this.props.actions.logout();
              this.props.actions.invalidateProperty();
              return navigator.popToTop(navigator.router.getRoute('settingList'));
            }},
          ]
        );
      }
      default :
        if(!isEmpty(route)) {
          return navigator.push(route);
        }
    }

  }

  render() {

    const {isAuthenticated,user} = this.props;
    return (
      <ScrollView style={styles.container}>

        {
          isAuthenticated &&
          <EditProfile
            loadScene = {this.loadScene}
            user={user}
          />
        }

        <List
          title = "Upload Property"
          route="propertyCreate"
          loadScene = {this.loadScene}
          icon="plus-square-o"
        />
        <List
          title = "Invite friends"
          route="inviteFriends"
          loadScene = {this.loadScene}
          icon="user-plus"
        />

        {
          isAuthenticated ?
            <List
              title = "Logout"
              route="logout"
              loadScene = {this.loadScene}
              icon="key"
            />

            :
            <List
              title = "Login"
              route="login"
              loadScene = {this.loadScene}
              icon="key"
            />
        }
      </ScrollView>
    );
  }

}

const styles =  StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: 64,
    backgroundColor:'white',
    margin:20,
  }
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({...AUTH_ACTIONS,...PROPERTY_ACTIONS}, dispatch) }
}

function mapStateToProps(state) {
  return {
    isAuthenticated:AUTH_SELECTORS.isAuthenticated(state),
    user:AUTH_SELECTORS.getCurrentUser(state)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingList);