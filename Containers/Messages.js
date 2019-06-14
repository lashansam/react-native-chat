import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import RNfirebase from 'react-native-firebase';
import { Actions as NavActions } from "react-native-router-flux";
import { List, Avatar } from 'react-native-paper';

export default class App extends Component {

  state = {
    chatRooms: [],
    currentUserName : this.props.uid===1? 'User 1' : 'User 2'
  }

  componentWillMount() {
    this.ref = RNfirebase.firestore().collection(`chatData`).where("usersInRoom", "array-contains", {
      id : this.props.uid,
      name: this.props.uid===1? 'User 1' : 'User 2',
      avatar : `https://placeimg.com/140/140/${this.props.uid}`
    })

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const chatRooms = querySnapshot.docs.map((docSnapshot)=>{
      console.log("TCL: App -> onCollectionUpdate -> docSnapshot", )
      const chatRoomUserInfo = docSnapshot.data().usersInRoom;
      const chattee = chatRoomUserInfo.filter((user)=>user.name!==this.state.currentUserName)
      return chattee[0];
    });

    this.setState({ chatRooms })
    
  }

  componentWillUnmount(){
    this.unsubscribe();
  }


  render() {

    return (
        <View>
            <FlatList 
              data={this.state.chatRooms}
              keyExtractor={(item, index)=> `${index}`}
              renderItem={({item, index})=>{
                return (
                <TouchableOpacity onPress={()=>NavActions.chatScreen({uid : this.props.uid, chatterID : this.props.uid, chateeID : item.id })}>
                  <View style={{ backgroundColor : '#34495e', margin : 10, borderRadius : 10, borderWidth : 1, borderColor : '#42586E' }}>
                    <List.Item
                      titleStyle={{ color : 'white'}}
                      descriptionStyle={{ color : '#7D8F98'}}
                      title={`Chat with ${item.name}`}
                      description="recent chat"
                      left={props => <View style={{ justifyContent : 'center', alignItems : 'center'}}><Avatar.Image style={{ backgroundColor : 'transparent' }} {...props} size={40} source={{ uri : item.avatar }}/></View>}
                    />
                  </View>
                </TouchableOpacity>)
              }}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({

});