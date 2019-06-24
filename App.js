import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './utils/navigation'
import {
  mapping,
  theme,
  light as lightTheme
} from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';


 class App extends React.Component {
  render() {
    return (
      <ApplicationProvider
         mapping={mapping}
         theme={lightTheme}>
          <AppNavigator />

       </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// AppRegistry.registerComponent("Your project name", ()=>{App})



export default App;
