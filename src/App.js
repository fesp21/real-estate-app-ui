import React,{ Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { ACTIONS } from './bootstrap';
import { connect } from "react-redux";
import { View, Text,Image } from 'react-native';
import Router from './lib/router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavBar from './common/NavBar';
import Colors from './common/Colors';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';

class App extends Component {

  static propTypes = {
    app:PropTypes.object.isRequired
  };

  static route={
    navigationBar:{
      visible:false
    }
  };

  componentDidMount() {
    this.props.dispatch(ACTIONS.boot());
  }

  render() {

    if(!this.props.app.bootstrapped) return null;

    return (
      <TabNavigation
        id="homeTab"
        navigatorUID="homeTab"
        initialTab="first"
        tabBarStyle={{ backgroundColor:Colors.primary }}
      >
        <TabNavigationItem
          id="first"
          renderIcon={(isSelected) => <Ionicons name="ios-home-outline" size={24} color={'white'}
                                                selectedStyle={styles.selectedTab}

          /> }>
          <StackNavigation
            id="propertiesStack"
            navigatorUID="propertiesStack"
            initialRoute={Router.getRoute('propertyList')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgba(255,255,255,0.2)',
                tintColor: '#fff',
                translucent:true,
                renderBackground: (props) => <NavBar {...props} />
              }
            }}
          />
        </TabNavigationItem>

        <TabNavigationItem
          id="second"
          renderIcon={(isSelected) => <FontAwesome name="heart-o" size={20} color={'white'}
                                                   selectedStyle={styles.selectedTab}
          /> }>
          <StackNavigation
            id="favoritesStack"
            navigatorUID="favoritesStack"
            initialRoute={Router.getRoute('propertyFavorites')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgba(255,255,255,0.2)',
                tintColor: '#fff',
                translucent:true,
                renderBackground: (props) => <NavBar {...props} />
              }
            }}
          />
        </TabNavigationItem>

        <TabNavigationItem
          id="third"
          renderIcon={(isSelected) => <FontAwesome name="plus" size={20} color={'white'}
                                                   selectedStyle={styles.selectedTab}
          /> }>
          <StackNavigation
            id="createStack"
            navigatorUID="createStack"
            initialRoute={Router.getRoute('propertyCreate')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgba(255,255,255,0.2)',
                tintColor: '#fff',
                translucent:true,
                renderBackground: (props) => <NavBar {...props} />
              }
            }}
          />
        </TabNavigationItem>


        <TabNavigationItem
          id="fourth"
          renderIcon={(isSelected) => <Ionicons name="ios-settings-outline" size={24} color={'white'}
                                                selectedStyle={styles.selectedTab}
          /> }>
          <StackNavigation
            id="settingsStack"
            navigatorUID="settingsStack"
            initialRoute={Router.getRoute('settingList')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgba(255,255,255,0.2)',
                tintColor: '#fff',
                translucent:true,
                renderBackground: (props) => <NavBar {...props} />
              }
            }}
          />

        </TabNavigationItem>

      </TabNavigation>
    );

  }
}

function mapStateToProps(state) {
  return {
    app: state.appReducer
  }
}

const styles = StyleSheet.create({
  selectedTab: {
    backgroundColor:'green'
  }
})
export default connect(mapStateToProps)(App);