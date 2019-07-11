import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Login from '../screens/Login'
import Register from '../screens/Register'
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import Help from '../screens/Help';
import Payment from '../screens/Payment';
import Trips from '../screens/Trips';
import WelcomeScreen from '../screens/WelcomeScreen';
import VerifyNumber from '../screens/verifyNumber';
import { fromLeft, zoomIn, zoomOut, fromRight } from 'react-navigation-transitions';
import SideMenu from '../components/SideMenu';
import Feedback from '../screens/Feedback';
import cardManage from '../screens/cardManage';

const drawer =  createDrawerNavigator({
  Page0: {
    screen: Home
  },
  Page1: {
    screen: Profile
  },
  Page2: {
    screen: Help
  },
  Page3: {
    screen: Payment
  },
  Page4: {
    screen: Trips
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});
 
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
  Home: { screen: createDrawerNavigator({
    Page0: {
      screen: Home
    },
    Page1: {
      screen: Profile
    },
    Page2: {
      screen: Payment
    },
    Page3: {
      screen: Feedback
    },
    Page4: {
      screen: Trips
    },
    Page5:{
      screen: Settings
    },
    mCards:{
      screen: cardManage
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: 300
  }) },
  Login: {screen: Login},
  Register: {screen: Register},
  Verify: {screen: VerifyNumber}

},{
      // initialRouteName: 'Register',
     transitionConfig: (nav) => handleCustomTransition(nav),
     headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
    // transitionConfig: () => fromLeft(),
});
const AppNavigator = createAppContainer(Root);

export default AppNavigator;