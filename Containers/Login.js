import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { Actions as NavActions } from "react-native-router-flux";
import RNfirebase from 'react-native-firebase';
import { Colors } from "Theme"
import { Banner, Button } from 'react-native-paper';

export default class App extends Component {

state = {
    visible: true,
};

onPressLogin({ uid, chatterID, chateeID }){

    let email = null;
    let password = 'password';

    if(uid===1){
        email = 'demo1@user.com'
    } else if(uid===2){
        email = 'demo2@user.com'
    }

    RNfirebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
        NavActions.messages({ uid })
    })
}

changeTheme(){
    Colors.switchTheme()
}

  render() {
    return (
        <View style={{ flex : 1, alignItems : 'center', justifyContent : 'center' }}>
            <Button 
                icon="account-circle" 
                mode="contained" 
                onPress={
                    () => this.onPressLogin({ uid : 1, chatterID : 1, chateeID : 2 })
                }
                style={{ marginVertical : 10 }}
                color="#e74c3c"
            >
                Login as user 1
            </Button>
            <Button 
                icon="tag-faces" 
                mode="contained" 
                onPress={
                    () => this.onPressLogin({ uid : 2, chatterID : 2, chateeID : 1 })
                }
                style={{ marginVertical : 10 }}
                color="#e67e22"
            >
                Login as user 2
            </Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
  });