import React, { Component } from 'react'
import { View, StatusBar, Text as Texta, ScrollView } from "react-native";
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
  Avatar, AvatarProps,
  Modal,
  Checkbox 
} from "react-native-ui-kitten";

import Colors from "../utils/colors";
import { gotoAnotherPage } from "../utils/universalFunctions";

class Profile extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fontLoaded: false,
    phone: "",
    code: "",
    visible: false,
    checked: false,
    fullName: '',
    email: '',
    Password: '',
    Confirm: ''
  };

  phoneChanged = value => {
      this.setState({
          phone: value
      })
  };
  onChange = ()=>{

  }
  onCheck = (checked) => {
    this.setState({ checked });
  };


  sendCode = () => {
   gotoAnotherPage('Home', this.props,{phone: this.state.phone})
  };

  async componentDidMount() {
    var self = this;
    await FontLoader();
    this.setState({ fontLoaded: true });
  }

  render() {
    if(!this.state.fontLoaded){
      return <AppLoading />
    }
      return (
          <Container>
          <StatusBar hidden />
          <ScrollView flex={1}>
            <Header transparent />
          <Grid>
            <Row size={1}>
              <View
                flex={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                {this.state.fontLoaded ? (
                  <Text
                    category="h1"
                    style={{
                      fontFamily: "Normal-text-open",
                      color: Colors.primary
                    }}
                  >
                    Profile
                  </Text>
                ) : null}
              </View>
            </Row>
            <Row size={5}>
                  
                  <View flex={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 5}}>
                  <Avatar style={{width: '60%', height: '80%', borderRadius: 15}} size="large" shape="rounded" source={{uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'}} />
               
                   </View>
              </Row>
             <Row size={3}>
              <View
                flex={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 20,
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Input
                  label="Full Name"
                  value={this.state.fullName}
                  disabled={true}
                  onChangeText={this.phoneChanged}
                />
                <Input
                  label="Email"
                  value={this.state.email}
                  disabled={true}
                  onChangeText={this.phoneChanged}
                />
                <Input
                  label="Phone number"
                  value={this.state.email}
                  disabled={true}
                  onChangeText={this.phoneChanged}
                />
                
               
    
    {this.state.editMode?  <Button onPress={this.sendCode}>Start journey</Button>:  <Button disabled={true} onPress={this.sendCode}>Done</Button>}
              </View>
            </Row>
              
              </Grid>
      

          </ScrollView>
         
          </Container>
    
      )
  }
}

export default Profile;
