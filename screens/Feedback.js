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
export class Feedback extends Component {
    static navigationOptions = {
        header: null
      };
    
      state = {
        fontLoaded: false,
        category: '',
        feedback: ''

      };
    
      categoryChanged = value => {
          this.setState({
              category: value
          })
      };
      feedbackChanged = value => {
        this.setState({
            feedback: value
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
                          Account
                        </Text>
                      ) : null}
                    </View>
                  </Row>
                  <Row size={1}>
                        
                        <View flex={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 15}}>
                        <Text category="label" status="info">Please give feedbacks on our service here</Text>
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
                      <Input
                        label="Feedback category"
                        type="select"
                        value={this.state.category}
                        onChangeText={this.categoryChanged}
                      />
                      
                     
                      <Input
                        label="Please explain"
                        type="textArea"
                        value={this.state.feedback}
                        onChangeText={this.feedbackChanged}
                      />
                      <Text category="label" status="info" style={{textAlign: 'center'}}>Terms and conditions</Text>
                      {/* <Checkbox
                      checked={this.state.checked}
                      status="success"
            onChange={this.onCheck} */}
          <CheckBoxNew
          style={{textAlign: 'center', alignSelf: 'center',}}
      title='I have read and accepted all terms and conditions'
      onPress={() => this.setState({checked: !this.state.checked})}
      checked={this.state.checked}
    />
          {this.state.checked?  <Button onPress={this.sendCode}>Start journey</Button>:  <Button disabled={true} onPress={this.sendCode}>Done</Button>}
                    </View>
                  </Row>
                    
                    </Grid>
            
    
                </ScrollView>
               
                </Container>
          
            )
    }
}

export default Feedback
