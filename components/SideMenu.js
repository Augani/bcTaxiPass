import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenuStyle.js';
import {NavigationActions} from 'react-navigation';
import {ScrollView, View} from 'react-native';

import { Container, Header } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FontLoader from "../utils/fontLoader";
import { SocialIcon, Overlay, CheckBox as CheckBoxNew } from "react-native-elements";
import { AppLoading } from "expo";

import {
  Input,
  Button,
  ButtonProps,
  Text,
  ListItem,
  List,
  Avatar, AvatarProps,
  Modal,
  Checkbox 
} from "react-native-ui-kitten";

import Colors from "../utils/colors";
import { gotoAnotherPage } from "../utils/universalFunctions";


const data = [
  'Profile',
  'Payments',
  'Feedback',
  'Trips',
  'Settings'
];

class TextList extends Component{
  render(){
    return(
      // <Text status="primary" category="p1">{this.props.textT}</Text>
      <Button appearance="ghost" textStyle={{color: Colors.primary}}    >
              {this.props.textT}
              </Button>
    )
  }
}


class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  

  onItemPress = (index) => {
    // Handle item press
    console.log(index)
    var self = this;
    switch(index){
      case 0:
      gotoAnotherPage('Page1', self.props)
      break;
      case 1:
      gotoAnotherPage('Page2', self.props)
      break; 
      case 2:
          gotoAnotherPage('Page3', self.props)
      break;
      case 3:
          gotoAnotherPage('Page4', self.props)
      break; 
      case 4:
          gotoAnotherPage('Page5', self.props)
      break;   
    }
  };

renderItem = (info) => {
    return (
      <ListItem
        onPress={this.onItemPress}
        style={{display: 'flex', justifyContent: 'flex-start', backgroundColor: Colors.accent}}
      >
        <TextList textT={info.item} />
      </ListItem>
    );
  };

  render () {
    return (
      <Container style={{backgroundColor: Colors.accent}}>
        <Header transparent />
        <Grid>
          <Row size={3}>
          <View flex={1} style={{display:  'flex', borderBottomColor: Colors.primary,
    borderBottomWidth: 1, justifyContent: 'center',alignItems: 'center', alignContent: 'center', padding: 15}}>
          <Avatar style={{width: '60%', height: '100%', borderRadius: 15}} size="giant" shape="rounded" source={{uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'}} />
          </View>
          </Row>
         
          <Row size={5}>
            <View flex={1} style={{display: 'flex', flexDirection: 'column',backgroundColor: Colors.accent}}>
            {/* <Row>
              <Button appearance="ghost"   onPress={this.navigateToScreen('Page1')}>
              Profile
              </Button>
              </Row>
              <Row>
              <Button appearance="ghost"   onPress={this.navigateToScreen('Page2')}>
              Payments
              </Button>
              </Row>
              <Row>
              <Button appearance="ghost"   onPress={this.navigateToScreen('Page2')}>
Feedback              </Button>
              </Row>
              <Row>
              <Button appearance="ghost"   onPress={this.navigateToScreen('Page2')}>
              Help
              </Button>
              </Row>
              <Row>
              <Button appearance="ghost"   onPress={this.navigateToScreen('Page3')}>
            Settings            
              </Button>
              </Row> */}
              <List
              style={{backgroundColor: Colors.accent}}
              data={data}
              renderItem={this.renderItem}
            />
            </View>

          </Row>
          <Row size={1}>

          </Row>
          <Row size={1}>
            <View flex={1} style={{display: 'flex', justifyContent: 'center'}}>
            <Button textStyle={{color: Colors.accent}} appearance="ghost">Logout</Button>

            </View>
          </Row>
        </Grid>
      </Container>
     
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;