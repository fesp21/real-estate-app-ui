import React,{ Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { StackNavigation, TabNavigation, TabNavigationItem } from '@exponent/ex-navigation';
import Router from './lib/router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavBar from './common/NavBar';
import Colors from './common/Colors';
import { ACTIONS } from './bootstrap';

class App extends Component {

  static propTypes = {
    app:PropTypes.object.isRequired
  };

  static route = {
    navigationBar:{
      visible:false
    }
  };

  componentDidMount() {
    this.props.dispatch(ACTIONS.boot());
  }

  render() {

    const {app,authReducer} = this.props;

    if(!app.bootstrapped) return null;

    return (
      <TabNavigation
        id="homeTab"
        navigatorUID="homeTab"
        initialTab="first"
        tabBarStyle={{ backgroundColor:Colors.primary }}
      >
        <TabNavigationItem
          id="first"
          renderIcon={(isSelected) => <Ionicons name="ios-home" size={24} color={isSelected ? 'tomato':'white'}

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
          renderIcon={(isSelected) => <FontAwesome name="heart" size={20} color={isSelected ? 'tomato':'white'}
          /> }>
          <StackNavigation
            id="favoritesStack"
            navigatorUID="favoritesStack"
            initialRoute={authReducer.isAuthenticated ? Router.getRoute('propertyFavorites') : Router.getRoute('login',{redirectRoute:'propertyFavorites'}) }
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
          renderIcon={(isSelected) => <FontAwesome name="plus" size={20} color={isSelected ? 'tomato':'white'}
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
          renderIcon={(isSelected) => <Ionicons name="ios-settings" size={24} color={isSelected ? 'tomato':'white'}
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
    app: state.appReducer,
    authReducer:state.authReducer
  }
}

export default connect(mapStateToProps)(App);