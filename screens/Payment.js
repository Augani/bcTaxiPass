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
      gotoCards = ()=>{
          gotoAnotherPage('mCards', this.props);
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
                        <CheckBoxNew
      style={{textAlign: 'center', alignSelf: 'center',}}
  title='Pay rides with Cash'
  onPress={() => this.setState({cash: !this.state.cash, card: !this.state.card})}
  checked={this.state.cash}
/>
                        
                        </Row>
                        <Row>
                        <CheckBoxNew
      style={{textAlign: 'center', alignSelf: 'center',}}
  title='Pay rides with Card'
  onPress={() => this.setState({card: !this.state.card, cash: !this.state.cash})}
  checked={this.state.card}
/>
                       
                            
                        </Row>
                     
                   
                    </View>
                  </Row>
                  <Row size={2}>
                  <View flex={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Button>Update</Button>

                      </View>
                    </Row>
                  
                    <Row size={2}>
                        {this.state.card? <View flex={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 15}}>
                        <Text category="label" status="info" onPress={this.gotoCards}>Manage Cards</Text>
                        </View>: null}
                        
                       
                    </Row>
                    
                    </Grid>
            
    
                </ScrollView>
               
                </Container>
          
            )
    }
}
