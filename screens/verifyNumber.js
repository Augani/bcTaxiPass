import React, { Component } from "react";
import {
  Alert,
  Animated,
  Image,
  View,
  StyleSheet,
  Platform,
  StatusBar
} from "react-native";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;

import CodeFiled from "react-native-confirmation-code-field";

import { Container, Header } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FontLoader from "../utils/fontLoader";
import { SocialIcon, Overlay } from "react-native-elements";

import {
  Input,
  Button,
  ButtonProps,
  Text,
  Modal,
  Avatar, AvatarProps
} from "react-native-ui-kitten";
import { gotoAnotherPage } from "../utils/universalFunctions";


export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 5;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
export const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const codeLength = 4;

const source = {
  uri:
    "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png"
};

export default class AnimatedExample extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    timer: 60,
    timerUp: false
  }
  _animationsColor = [...new Array(codeLength)].map(
    () => new Animated.Value(0)
  );
  _animationsScale = [...new Array(codeLength)].map(
    () => new Animated.Value(1)
  );

  componentDidMount(){
    var self = this;
   const interval =  setInterval(function(){
      if(self.state.timer == 0){
        clearInterval(interval);
        self.setState({
          timerUp: true
        })
      }
      self.setState({
        timer: self.state.timer - 1
      })
    }, 1000)
  }

  onFinishCheckingCode = code => {
    if (code !== "1234") {
      return Alert.alert(
        "Confirmation Code",
        "Code not match! Try 1234",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    // Alert.alert("Confirmation Code", "Successful!", [{ text: "OK" }], {
    //   cancelable: true
    // });
    gotoAnotherPage("Register", this.props, null);
  };

  animateCell({ hasValue, index, isFocused }) {
    Animated.parallel([
      Animated.timing(this._animationsColor[index], {
        toValue: isFocused ? 1 : 0,
        duration: 250
      }),
      Animated.spring(this._animationsScale[index], {
        toValue: hasValue ? 0 : 1,
        duration: hasValue ? 300 : 250
      })
    ]).start();
  }

  cellProps = ({ hasValue, index, isFocused }) => {
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? this._animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          })
        : this._animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          }),
      borderRadius: this._animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS]
      }),
      transform: [
        {
          scale: this._animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1]
          })
        }
      ]
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      this.animateCell({ hasValue, index, isFocused });
    }, 0);

    return {
      style: [styles.input, animatedCellStyle]
    };
  };

  containerProps = { style: styles.inputWrapStyle };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Header transparent />
        <Grid>
          <Row>
            <View
            flex={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <FirstScreen />
            </View>
          </Row>
          <Row>
            <View
             flex={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'column',
              }}
            >
              <CodeFiled
                maskSymbol=" "
                variant="clear"
                codeLength={codeLength}
                keyboardType="numeric"
                cellProps={this.cellProps}
                containerProps={this.containerProps}
                onFulfill={this.onFinishCheckingCode}
                CellComponent={Animated.Text}
              />
               
            </View>
          </Row>
          <Row>
            <View
            flex={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
            <Text category="c1" status="info" style={{margin: 10}}>Return to previous screen to change Number</Text>
            {this.state.timerUp?  <Button>Resend Code</Button>:  <Button disabled={true}>{this.state.timer}s</Button>}
           
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }
}


class FirstScreen extends Component {
  state = {
    animation: null,
    popoverVisible: false
  };

  componentWillMount() {
    this._playAnimation();
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result = await require("../assets/animations/phone-loading.json");
    // .then(data => {
    //   return data.json();
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    this.setState({ animation: result }, this._playAnimation);
  };
  togglePopover = () => {
    this.setState({ popoverVisible: !this.state.popoverVisible });
  };
  renderPopoverContentElement = () => {
    return (
      <View>
        <Text>Hi! This is popover.</Text>
      </View>
    );
  };

  render() {
    return (
      <View
        flex={1}
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Row size={1}>
          <View
            flex={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{fontFamily: 'Heading', fontSize:14, textAlign: 'center', color: Colors.primary}}>
             Please check your phone. We just sent a code to your number.
              Code will automatically be checked when enterred
            </Text>
          </View>
        </Row>
        <Row size={3}>
          {this.state.animation && (
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 200,
                height: 200
                // backgroundColor: '#eee',
              }}
              source={this.state.animation}
            />
          )}
        </Row>
        <Row size={1}>
         
        </Row>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: "white",
    paddingHorizontal: 20
  },

  inputLabel: {
    paddingTop: 50,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40
  },

  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto"
  },
  inputSubLabel: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center"
  },
  inputWrapStyle: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },

  input: {
    margin: 0,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: 55,
    ...Platform.select({
      web: {
        lineHeight: 65
      }
    }),
    fontSize: 30,
    borderRadius: CELL_BORDER_RADIUS,
    color: "#3759b8",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3
  },

  nextButton: {
    marginTop: 40,
    borderRadius: 80,
    minHeight: 80,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    flex: 1,
    minWidth: 360,
    marginBottom: 100
  },

  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700"
  }
});
