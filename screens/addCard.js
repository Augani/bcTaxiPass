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
class addCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> addCard </Text>
      </View>
    );
  }
}

export default addCard;
