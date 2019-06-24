import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Constants, MapView, Location, Permissions, AppLoading } from "expo";
import { Container, Header, Left, Body, Right, Card, CardItem, } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FontLoader from "../utils/fontLoader";
import { SocialIcon, Overlay } from "react-native-elements";
import { API_KEY } from '../utils/config'

import {
  Input,
  Button,
  ButtonProps,
  Text,
  Modal,
  List,
  ListItem,
} from "react-native-ui-kitten";

import Colors from "../utils/colors";
import { gotoAnotherPage, makePostRequest, makeGetRequest } from "../utils/universalFunctions";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;

export class Home extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
    CardHeight: '20%',
    showCardBack: false,
    placesList: [],
    whereto: '',
    wherefrom: 'Your Location'
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  placeChanged = (value)=>{
    this.setState({
        whereto: value,
        CardHeight: '100%',
        showCardBack: true
    })
    this.getAutoComplete(value);
  }

  getPlaceNearby = (value)=>{
      const { location} = this.state;
      var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=1500&keyword=${value}&key=${API_KEY}`;
    makeGetRequest(url, null).then(res=>{
        var r = JSON.parse(res);
        // console.log(r);
    }).catch(err=>{
        // console.log(err)
    })
    }

    getAutoComplete = (value)=>{
        var self = this;
        const {mapRegion} = this.state;
        var url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&location=${mapRegion.latitude},${mapRegion.longitude}&radius=500&key=${API_KEY}`;
        makeGetRequest(url, null).then(res=>{
            self.setState({
                placesList: res.data.predictions
            })
        }).catch(err=>{
            // console.log(err)
        })
    }
    renderItem = (info) => {
        console.log(info)
        return (
          <ListItem
            title={info.item.description}
          />
        );
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
       
        <View style={styles.container}>
          {this.state.locationResult === null ? (
            <Text>Finding your current location...</Text>
          ) : this.state.hasLocationPermissions === false ? (
            <Text>Location permissions are not granted.</Text>
          ) : this.state.mapRegion === null ? (
            <Text>Map region doesn't exist.</Text>
          ) : (
            <MapView
              style={{ alignSelf: "stretch", height: "100%" }}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
            >
              <MapView.Marker
                coordinate={this.state.location.coords}
                title="Your location"
                description="Some description"
              >
                <ThirdScreen />
              </MapView.Marker>
            </MapView>
          )}
          <View style={{display: 'flex', width: '100%', bottom: 0,  position: 'absolute', height: this.state.CardHeight}}>
          <Card style={{height: '100%'}}>
            <CardItem header>
            <Text category="label" status="info">Where are you going</Text>
            </CardItem>
            <CardItem>
              <Body>
                  {this.state.showCardBack?
                     <Input
                     label="Your location"
                     value={this.state.wherefrom}
                     onChangeText={this.placeChanged}
                   /> : null}
              <Input
                label="Enter drop off point"
                value={this.state.whereto}
                onChangeText={this.placeChanged}
              />
             <ScrollView flex={1}>
                 <Card>

                
                    {!this.state.placesList.length? null:
                    this.state.placesList.map((item, index)=>{

                       return  (<CardItem key={item.id}>
              
                       <Text>{item.description}</Text>
                       {/* <Right>
                         <Icon name="arrow-forward" />
                       </Right> */}
                      </CardItem>)
                    })}
                     </Card>
             </ScrollView>
              </Body>
            </CardItem>
            <CardItem footer>
             
            </CardItem>
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
    let result = await require("../assets/animations/walk.json");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
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
