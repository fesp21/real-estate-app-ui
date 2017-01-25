import React,{ Component } from 'react';
import { Provider } from 'react-redux';
import { NavigationContext, NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import { NavigationStyles } from '@exponent/ex-navigation';
import Router from './lib/router';
import Store from './lib/store';
import CodePush from 'react-native-code-push';
import {CODEPUSH_ENABLED} from './env';

const navigationContext = new NavigationContext({
  router: Router,
  store: Store,
});

export default class Root extends Component {

  constructor() {
    super();
    if(CODEPUSH_ENABLED) {
      CodePush.sync();
    }
  }

  render() {
    const modalStyle = {
      ...NavigationStyles.SlideVertical,
      gestures: null,
      sceneAnimations: (props) => {
        const {
          position,
          scene,
        } = props;

        const index = scene.index;
        const inputRange = [index - 1, index, index + 1];

        const opacity = position.interpolate({
          inputRange,
          outputRange: [0, 1, 1],
        });

        return {
          opacity,
          transform: [
            {translateX: 0},
            {translateY: 0},
            {scale: 1},
          ],
          backgroundColor: 'transparent',
          shadowOpacity: 0
        };
      }
    };

    return (
      <Provider store={Store} >
        <NavigationProvider context={navigationContext}>
          <StackNavigation
            id="rootStack"
            navigatorUID="rootStack"
            initialRoute="app"
            defaultRouteConfig={{
              styles: {...modalStyle}
            }}
          />
        </NavigationProvider>
      </Provider>
    );
  }

}