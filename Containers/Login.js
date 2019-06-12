import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { Actions as NavActions } from "react-native-router-flux";
import RNfirebase from 'react-native-firebase';

export default class App extends Component {

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

  render() {
    return (
        <View>
            <View style={{ paddingTop : 50 }}  />
            <Button onPress={()=>{this.onPressLogin({ uid : 1, chatterID : 1, chateeID : 2 })}} title={'user 1'}/>
            <View style={{ paddingTop : 50 }}  />
            <Button onPress={()=>{this.onPressLogin({ uid : 2, chatterID : 2, chateeID : 1 })}} title={'user 2'}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({

});