import React, { Component } from "react";
import { View, StatusBar, Text } from "react-native";
import { Container, Header } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FontLoader from "../utils/fontLoader";
import { AppLoading } from "expo";
import Colors from "../utils/colors";
import { gotoAnotherPage } from "../utils/universalFunctions";
import {
  ViewPager,
  Button,
  Radio,
  RadioGroup,
  Popover
} from "react-native-ui-kitten";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;

export class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fontLoaded: false,
    selectedIndex: 0
  };

  onIndexChange = selectedIndex => {
    this.setState({ selectedIndex });
  };

  async componentDidMount() {
    var self = this;
    await FontLoader();
    this.setState({ fontLoaded: true });
    // setTimeout(function() {
    //   gotoAnotherPage("Login", self.props);
    // }, 3000);
  }

  enter = ()=>{
    gotoAnotherPage("Login", this.props);
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
      <Container style={{ backgroundColor: Colors.accent }}>
        <StatusBar hidden />
        <Header transparent />
        <Grid>
          <Row size={5}>
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
              <ViewPager
                selectedIndex={this.state.selectedIndex}
                onSelect={this.onIndexChange}
              >
                <View
                  style={{
                    display: "flex",
                    padding: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <FirstScreen />
                </View>
                <View
                  style={{
                    display: "flex",
                    padding: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <SecondScreen />
                </View>
                <View
                  style={{
                    display: "flex",
                    padding: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <ThirdScreen />
                </View>
                <View
                  style={{
                    display: "flex",
                    padding: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <FourthScreen Actions={this.enter} />
                </View>
              </ViewPager>
            </View>
          </Row>
          <Row size={2}>
            <View
              flex={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <RadioGroup
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "stretch",
                  justifyContent: "space-between",
                  width: "30%"
                }}
                selectedIndex={this.state.selectedIndex}
                onChange={this.onGroupSelectionChange}
              >
                <Radio style={{ width: 2, height: 2 }} />
                <Radio style={{ width: 2, height: 2 }} />
                <Radio style={{ width: 2, height: 2 }} />
                <Radio style={{ width: 2, height: 2 }} />
              </RadioGroup>
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
    let result = await require("../assets/animations/location-new.json");
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
            <Text style={{fontFamily: 'Heading', fontSize:20, textAlign: 'center', color: Colors.primary}}>
              With precise location enabled, we know exactly where you are to
              provide the service you love
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
                width: 400,
                height: 400
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

class SecondScreen extends Component {
  state = {
    animation: null
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
    let result = await require("../assets/animations/car.json");
    // .then(data => {
    //   return data.json();
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    this.setState({ animation: result }, this._playAnimation);
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
            <Text style={{fontFamily: 'Heading', fontSize:20, textAlign: 'center', color: Colors.primary}} >
             Get a cab with ease throughout the city, ride with us wherever you go
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
                width: 400,
                height: 400
                // backgroundColor: '#eee',
              }}
              source={this.state.animation}
            />
          )}
        </Row>
        <Row size={1} />
      </View>
    );
  }
}

class ThirdScreen extends Component {
  state = {
    animation: null
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
    let result = await require("../assets/animations/credit.json");
    // .then(data => {
    //   return data.json();
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    this.setState({ animation: result }, this._playAnimation);
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
            <Text style={{fontFamily: 'Heading', fontSize:20, textAlign: 'center', color: Colors.primary}} >
            No need to carry cash around when your card is all you need
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
                width: 400,
                height: 400
              }}
              source={this.state.animation}
            />
          )}
        </Row>
        <Row size={1} />
      </View>
    );
  }
}
class FourthScreen extends Component {
  state = {
    animation: null
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

  start = ()=>{
    this.props.Actions();
  }

  _loadAnimationAsync = async () => {
    let result = await require("../assets/animations/stars.json");
    // .then(data => {
    //   return data.json();
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    this.setState({ animation: result }, this._playAnimation);
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
            <Text style={{fontFamily: 'Heading', fontSize:20, textAlign: 'center', color: Colors.primary}} >
            Rate and get rated on each ride and stand the chance of winning amazing prizes
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
                width: 300,
                height: 400,
                marginBottom: 10,
              }}
              source={this.state.animation}
            />
          )}
        </Row>
        <Row size={1}>
          <View flex={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          <Button size="small" onPress={this.start}>
            Start
          </Button>
          </View>
        </Row>
      </View>
    );
  }
}

export default WelcomeScreen;
