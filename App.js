/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Login, Messages, ChatScreen } from "Containers"
import { Scene, Router, Stack } from "react-native-router-flux";
import { Provider as PaperProvider } from 'react-native-paper';

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#34495e" barStyle="light-content" />
        <Router
          sceneStyle={{ backgroundColor : "#2c3e50"}}
        >
          <Stack key="root"
           navigationBarStyle={{ backgroundColor : "#34495e"}}
           titleStyle={{ color : 'white'}}
           tintColor={'white'}
          >
            <Scene key="login" component={Login} title="Select your user" initial />
            <Scene key="messages" component={Messages} title="Messages"/>
            <Scene key="chatScreen" component={ChatScreen}/>
          </Stack>
        </Router>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
