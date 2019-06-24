import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Container, Header } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FontLoader from "../utils/fontLoader";
import { SocialIcon, Overlay } from "react-native-elements";
import { AppLoading } from "expo";

import {
  Input,
  Button,
  ButtonProps,
  Text,
  Modal
} from "react-native-ui-kitten";

import Colors from "../utils/colors";
import { gotoAnotherPage } from "../utils/universalFunctions";

export class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fontLoaded: false,
    phone: "",
    code: "",
    visible: false
  };

  phoneChanged = value => {
      this.setState({
          phone: value
      })
  };

  sendCode = () => {
   gotoAnotherPage('Verify', this.props,{phone: this.state.phone})
  };

  async componentDidMount() {
    var self = this;
    await FontLoader();
    this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <Container>
        <StatusBar hidden />
       
        <Grid>
          <Row>
          <View
              flex={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
             
              <Row size={1}>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
               
              </Row>
              <Row size={1}>
              <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row size={1}>
              <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row size={1}>
              <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                
              </Row>
              <Row size={1}>
              <Col></Col>
                
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row size={1}>                 
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row size={1}>
              <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
              </Row>
            
             
              
            </View>
        
          </Row>
          <Row>
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
                    fontFamily: "Heading",
                    fontSize: 50,
                    color: Colors.primary
                  }}
                >
                  Lyca
                </Text>
              ) : null}
            </View>
          </Row>
           <Row>
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
                // placeholder="+233"
                label="Phone number"
                // style={{margin: 10, borderWidth: 5, borderColor: Colors.secondary}}
                // leftIcon={{ type: "font-awesome", name: "phone" }}
                caption="Please only enter your number without country code, Your location will be used."
                value={this.state.phone}
                onChangeText={this.phoneChanged}
              />
              <Button onPress={this.sendCode}>Continue</Button>
            </View>
          </Row>
          <Row>
            <View
              flex={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
             
              <Row size={1}>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
               
              </Row>
              <Row size={1}>
              <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row size={1}>
              <Col></Col>
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row size={1}>
              <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
                
              </Row>
              <Row size={1}>
              <Col></Col>
                
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
                  <Col></Col>
              </Row>
              <Row size={1}>                 
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
                  <Col></Col>
              </Row>
              <Row size={1}>
             
                  <Col></Col>
                  <Col></Col>
                  <Col style={{backgroundColor: Colors.primary}}></Col>
              </Row>
            
             
              
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }
}

export default Login;
