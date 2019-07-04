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
      <Text status="primary" category="p1">{this.props.textT}</Text>
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
  };

renderItem = (info) => {
    return (
      <ListItem
        onPress={this.onItemPress}
      >
        <TextList textT={info.item} />
      </ListItem>
    );
  };

  render () {
    return (
      <Container>
        <Header transparent />
        <Grid>
          <Row size={3}>
          <View flex={1} style={{display: 'flex', justifyContent: 'center',alignItems: 'center', alignContent: 'center'}}>
          <Avatar style={{width: '60%', height: '80%', borderRadius: 15}} size="large" shape="rounded" source={{uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'}} />
          </View>
          </Row>
          <Row size={3}>
            <View flex={1} style={{display: 'flex', flexDirection: 'column',}}>
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
              data={data}
              renderItem={this.renderItem}
            />
            </View>

          </Row>
          <Row size={1}>

          </Row>
          <Row size={1}>
          <Button appearance="ghost">Logout</Button>
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