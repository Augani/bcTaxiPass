import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';


 class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ff</Text>
</View>
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

AppRegistry.registerComponent("Your project name", ()=>{App})



export default App;
