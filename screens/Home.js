import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
  TouchableWithoutFeedback
} from "react-native";
import { Constants, MapView, Location, Permissions, AppLoading } from "expo";
import Polyline from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Card,
  CardItem
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FontLoader from "../utils/fontLoader";
import { SocialIcon, Overlay, Icon } from "react-native-elements";
import { API_KEY } from "../utils/config";

import {
  Input,
  Button,
  ButtonProps,
  Text,
  Modal,
  List,
  ListItem
} from "react-native-ui-kitten";

import Colors from "../utils/colors";
import {
  gotoAnotherPage,
  makePostRequest,
  makeGetRequest,
  connectToSocket
} from "../utils/universalFunctions";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;


const GOOGLE_MAPS_APIKEY = "AIzaSyAzb_EziNyxtjF5QChY7QVsvTXdpNoJBmI";



class TextList extends Component{
  render(){
    return(
       <Text status="primary" category="label">{this.props.textT}</Text>
      // <Button appearance="ghost" textStyle={{color: Colors.accent}}    >
      //         {this.props.textT}
      //         </Button>
    )
  }
}

export class Home extends Component {
  static navigationOptions = {
    header: null
  };
  
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
    CardHeight: "30%",
    showCardBack: false,
    placesList: [],
    whereto: "",
    wherefrom: "Your Location",
    carLocation: null,
    possibleLocations : [],
    ongoingTrip: true,
    trip: {
      "origin": {
        latitude:5.5502,
        longitude:-0.2174
      },
      "dest": {
        "latitude":5.660989,
        "longitude":-0.166404
      }
    }
   
  };
  determineUser() {
    console.log('calling');
    AsyncStorage.getItem('userId')
      .then((userId) => {
        if (userId) {
          this.socket.emit('i-dont-need-an-id');
        } else {
          this.socket.emit('i-need-id');
          this.socket.on('here-is-your-id', (id) => {
            AsyncStorage.setItem('userId', id);
            // Force a rerender in the React component
            this.setState({ id });
          });
        }
    });
  }

  componentDidMount() {
    this._getLocationAsync();
  //  connectToSocket();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  placeChanged = value => {
    this.setState({
      whereto: value,
      CardHeight: "100%",
      showCardBack: true
    });
    this.getAutoComplete(value);
  };

  getPlaceNearby = value => {
    var self = this;
    const { location } = this.state;
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      location.coords.latitude
    },${location.coords.longitude}&radius=1500&keyword=${value}&key=${API_KEY}`;
    makeGetRequest(url, null)
      .then(res => {
        var r = JSON.parse(res);
        
      })
      .catch(err => {
        // console.log(err)
      });
  };

  goBack = () => {
    this.setState({
      showCardBack: false,
      CardHeight: "30%"
    });
  };

  getDirections = ()=>{
    var from  = this.state.location.coords;
    var data = {
      "origin":from,
    "destination":{
        "latitude":5.660989,
        "longitude":-0.166404
    },
    "mode": "driving",
    "traffic_model": "best_guess"
    };
    var self = this;
    makePostRequest('https://ridebookingserver.herokuapp.com/api/maps/getDirection', data).then(r=>{
      self.setState({
        
      })
    }).catch(e=>{

    })
  }

  getAutoComplete = value => {
    var self = this;
    const { mapRegion } = this.state;
    var url = `https://ridebookingserver.herokuapp.com/api/maps/autocomp`;
    var data ={
      "input": value,
      "location":{
        "latitude":mapRegion.latitude,
        "longitude":mapRegion.longitude
      }
    }
    makePostRequest(url, data)
      .then(res => {
      
        self.setState({
          possibleLocations: res.data,
        });
      })
      .catch(err => {
        // console.log(err)
      });
      console.log(self.state.possibleLocations);
  };
  renderItem = (info) => {
    return (
      <ListItem
        onPress={this.onItemPress}
        style={{display: 'flex', justifyContent: 'flex-start', backgroundColor: Colors.primary}}
      >
        <TextList textT={info.item.description} />
      </ListItem>
    );
  };

  renderCar = () => {
    var carLocation = {
      latitude: 5.585872408466383,
      longitude: -0.18457947141109798,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    this.setState({
      carLocation
    });
  };

  openDrawer = ()=>{
    this.props.navigation.openDrawer();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });

    // Center the map on the location we just fetched.
    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Header transparent>
        <Left transparent>
                    <TouchableWithoutFeedback onPress={this.openDrawer}>
                      <Icon
                        name="menu"
                        type="entypo"
                        color={Colors.primary}
                      />
                    </TouchableWithoutFeedback>
                 

        </Left>
        <Body transparent/>
        <Right transparent/>
        </Header>

        <View style={styles.container}>
          {this.state.locationResult === null ? (
            <Text>Finding your current location...</Text>
          ) : this.state.hasLocationPermissions === false ? (
            <Text>Location permissions are not granted.</Text>
          ) : this.state.mapRegion === null ? (
            <Text>Map region doesn't exist.</Text>
          ) : (
            <MapView
              style={{ height: "100%", width: "100%" }}
              region={this.state.mapRegion}
             
            >
             {this.state.ongoingTrip? 
             <MapViewDirections
             origin={this.state.trip.origin}
             destination={this.state.trip.dest}
             strokeWidth={3}
            strokeColor="hotpink"
             apikey={GOOGLE_MAPS_APIKEY}
           />
              :null}
              {/* <MapView.Marker
                coordinate={this.state.location.coords}
                title="Your location"
                description="Some description"
              >
                <ThirdScreen />
              </MapView.Marker> */}
            </MapView>
          )}
          <View
            style={{
              display: "flex",
              margin: 0,
              width: "100%",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              bottom: 0,
              position: "absolute",
              height: this.state.CardHeight
            }}
          >
            <Card style={{ height: "100%" }}>
              <CardItem header>
                <Left>
                {this.state.showCardBack ? (
                  <View style={{ flex: 1, width: "100%" }}>
                    <TouchableHighlight onPress={this.goBack}>
                      <Icon
                       
                        name="ios-return-left"
                        type="ionicon"
                        color={Colors.primary}
                      />
                    </TouchableHighlight>
                  </View>
                ) :null}

                </Left>
                <Body>
                {this.state.showCardBack ? null: (
                  <Text category="h4">
                    {/* Good evening Augustus. Easily book a ride with just a tap */}
                  </Text>
                )}

                </Body>
                <Right/>
               
              </CardItem>
              {this.state.showCardBack ?  (
                <CardItem>
                  <LoadingScreen style={{ width: "100%" }} />
                </CardItem>
              ) : null}
              <CardItem>
                <Body>
                  {this.state.showCardBack ? (
                    <Input
                      label="Starting point"
                      value={this.state.wherefrom}
                      onChangeText={this.placeChanged}
                    />
                  ) : null}
                  <Input
                    label="Enter drop off point"
                    value={this.state.whereto}
                    onChangeText={this.placeChanged}
                  />
                  <ScrollView flex={1}>
                  {this.state.possibleLocations.length? <List
              
              data={this.state.possibleLocations}
              renderItem={this.renderItem}
            /> : null}
                  </ScrollView>
                </Body>
              </CardItem>
              <CardItem footer />
            </Card>
          </View>
        </View>
      </Container>
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
    let result = await require("../assets/animations/locate.json");

    this.setState({ animation: result }, this._playAnimation);
  };

  render() {
    return (
      <View
        flex={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.state.animation && (
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 60,
              height: 60
            }}
            source={this.state.animation}
          />
        )}
      </View>
    );
  }
}

class CarScreen extends Component {
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
    let result = await require("../assets/animations/locate.json");
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
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.state.animation && (
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 60,
              height: 60
            }}
            source={this.state.animation}
          />
        )}
      </View>
    );
  }
}

class LoadingScreen extends Component {
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
    let result = await require("../assets/animations/progress_bar.json");
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
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.state.animation && (
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 120,
              height: 60
            }}
            source={this.state.animation}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});

export default Home;
