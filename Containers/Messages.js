import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import RNfirebase from 'react-native-firebase';
import { Actions as NavActions } from "react-native-router-flux";

export default class App extends Component {

  state = {
    chatRooms: [],
  }

  componentWillMount() {
    this.ref = RNfirebase.firestore().collection(`${this.props.uid}_rooms`)
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    console.log("TCL: App -> onCollectionUpdate -> querySnapshot", querySnapshot)
    
    const chatRooms = querySnapshot.docs.map((docSnapshot)=>{
      return docSnapshot.data()
    });
    

    this.setState({ chatRooms })
    // console.log("TCL: App -> onCollectionUpdate -> chatRooms", chatRooms)
    
  }

  componentWillUnmount(){
    this.unsubscribe();
  }


  render() {

    console.log("TCL: App -> onCollectionUpdate -> chatRooms", this.state.chatRooms)

    return (
        <View>
            <FlatList 
              data={this.state.chatRooms}
              keyExtractor={(item, index)=> `${index}`}
              renderItem={({item, index})=>{
                return (<TouchableOpacity onPress={()=>NavActions.chatScreen({uid : this.props.uid, chatterID : this.props.uid, chateeID : item.id })}>
                  <Text style={{ fontSize : 20 }}>{`press to chat with user ${item.id}`}</Text>
                </TouchableOpacity>)
              }}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({

});