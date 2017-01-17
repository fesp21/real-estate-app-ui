/**
 * @flow
 */
import React, { PropTypes, Component, PureComponent } from 'react';
import { ScrollView, StyleSheet, StatusBar, Text, Image,Dimensions } from 'react-native';
import { connect } from "react-redux";
import List from './Components/SettingList';
import { SELECTORS as AUTH_SELECTORS } from './../../modules/Auth/selectors';
import isEmpty from 'lodash/isEmpty';

class SettingList extends Component {

  constructor() {
    super();
    this.loadEntity = this.loadEntity.bind(this);
  }

  static route = {
    navigationBar: {
      title: () => <Text>Settings</Text>
    },
  };

  loadEntity(route = null) {
    const { navigator,navigation } = this.props;
    switch (route) {
      case 'propertyCreate':
        return  navigation.performAction(({ tabs, stacks }) => {
          tabs('homeTab').jumpToTab('third');
        });
      case 'login':
        return navigator.push(navigator.router.getRoute(route,{
          redirectRoute:'settingList'
        }));
      case 'logout': {
        break;
      }
      default :
        if(!isEmpty(route)) {
          return navigator.push(route);
        }
    }

  }

  render() {

    const {isAuthenticated} = this.props;
    return (
      <ScrollView style={styles.container}>
        <List
          title = "Upload Property"
          route="propertyCreate"
          loadEntity = {this.loadEntity}
          icon="plus-square-o"
        />
        <List
          title = "Invite friends"
          route="inviteFriends"
          loadEntity = {this.loadEntity}
          icon="user-plus"
        />

        {
          isAuthenticated ?
            <List
              title = "Logout"
              route="logout"
              loadEntity = {this.loadEntity}
              icon="key"
            />

            :
            <List
              title = "Login"
              route="login"
              loadEntity = {this.loadEntity}
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
    margin:10,
    marginTop:20
  }
});

function mapStateToProps(state) {
  return {
    isAuthenticated:AUTH_SELECTORS.isAuthenticated(state)
  }
}

export default connect(mapStateToProps)(SettingList);