import React,{ Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { ACTIONS } from './bootstrap';
import { connect } from "react-redux";
import { View, Text,Image } from 'react-native';
import Router from './lib/router';
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
    // this.props.dispatch(ACTIONS.boot());
  }

  render() {

    // if(!this.props.app.bootstrapped) return null;

    return (
      <TabNavigation
        id="homeTab"
        navigatorUID="homeTab"
        initialTab="third"
        tabBarStyle={{ backgroundColor:Colors.primary }}
      >


        <TabNavigationItem
          id="third"
        >
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