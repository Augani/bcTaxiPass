import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Login from '../screens/Login'
import Register from '../screens/Register'
import WelcomeScreen from '../screens/WelcomeScreen';
import VerifyNumber from '../screens/verifyNumber';
import { fromLeft, zoomIn, zoomOut, fromRight } from 'react-navigation-transitions'
 
const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (nextScene.route.routeName === 'Login') {
    return zoomIn();
  }else if(nextScene.route.routeName === 'Verify'){
    return fromRight();
  } else if (nextScene.route.routeName === 'Register') {
    return zoomOut();
  } else if (nextScene.route.routeName === 'Home') {
    return zoomIn();
  }
  return fromLeft();
}

const Root = createStackNavigator({
    Welcome: {screen: WelcomeScreen},
  Home: { screen: Home },
  Login: {screen: Login},
  Register: {screen: Register},
  Verify: {screen: VerifyNumber}

},{
    //  initialRouteName: 'Register',
     transitionConfig: (nav) => handleCustomTransition(nav)
    // transitionConfig: () => fromLeft(),
});
const AppNavigator = createAppContainer(Root);

export default AppNavigator;