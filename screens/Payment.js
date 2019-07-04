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
  Modal,
  Checkbox 
} from "react-native-ui-kitten";

import Colors from "../utils/colors";
import { gotoAnotherPage } from "../utils/universalFunctions";
export default class Payment extends Component {
    static navigationOptions = {
        header: null
      };
    
      state = {
        fontLoaded: false,
        cash: true,
        card: false
      }
    
      phoneChanged = value => {
          this.setState({
              phone: value
          })
      };
      onCardChanged = (v)=>{
          var self = this;
          this.setState({
              card: !self.state.card,
              cash: !self.state.cash
          })

      }
      onCashChanged = (v)=>{
        var self = this;
        this.setState({
            card: !self.state.card,
            cash: !self.state.cash
        })
          

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
                          Payment
                        </Text>
                      ) : null}
                    </View>
                  </Row>
                  <Row size={1}>
                        
                        <View flex={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 15}}>
                        <Text category="label" status="info">Please select you primary payment method</Text>
                        </View>
                    </Row>
                   <Row size={4}>
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
                        <Row>
                        <CheckBox
                        text="Cash"
                            checked={this.state.cash}
                            onChange={this.onCashChanged}
                        />
                        </Row>
                        <Row>
                        <CheckBox
                            text="Card"
                            checked={this.state.card}
                            onChange={this.onCardChanged}
                        />
                            
                        </Row>
                     
                    <Button>Update</Button>
                    </View>
                  </Row>
                    
                    </Grid>
            
    
                </ScrollView>
               
                </Container>
          
            )
    }
}
