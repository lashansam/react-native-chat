import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { GiftedChat, MessageImage } from 'react-native-gifted-chat'
import RNfirebase from 'react-native-firebase';

export default class App extends Component {

  state = {
    messages: [],
  }

  componentWillMount() {
    this.chatterRoomRef = RNfirebase.firestore().collection(`${this.props.uid}_rooms`);
    this.chateeRoomRef = RNfirebase.firestore().collection(`${this.props.chateeID}_rooms`);
    this.ref = RNfirebase.firestore().collection('chatData').doc(this.chatID()).collection('chats');
    this.unsubscribe = this.ref.orderBy('createdAt', "desc").onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = querySnapshot.docs.map((docSnapshot)=>{

      const message = docSnapshot.data();

      if(message.user._id!==this.props.uid){
        this.ref.doc(docSnapshot.id).update("received", true)
      }

      return {
      ...docSnapshot.data(),
      createdAt : docSnapshot.data().createdAt.toDate()
    }})
    this.setState({ messages })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  chatID = () => {
    const chatterID = this.props.chatterID;
    const chateeID = this.props.chateeID;
    const chatIDpre = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    return chatIDpre.join('_');
  };


  onSend(messages = []) {
    messages[0].sent = true;
    messages[0].received = false;
    this.chatterRoomRef.get().then((response)=>{
      const roomAlreadyExist = response.docs.filter((doc)=>{

        console.log("TCL: onSend -> doc.data().id", doc.data().id)

        if(doc.data().id===this.props.chateeID){
          return true;
        } else {
          false;
        } 
      })
      
      console.log("TCL: onSend -> roomAlreadyExist", roomAlreadyExist);

      if(roomAlreadyExist.length === 0){
        this.chatterRoomRef.add({ id: this.props.chateeID })
      }
    })

    this.chateeRoomRef.get().then((response)=>{
      const roomAlreadyExist = response.docs.filter((doc)=>{

        console.log("TCL: onSend -> doc.data().id", doc.data().id)

        if(doc.data().id===this.props.chatterID){
          return true;
        } else {
          false;
        } 
      })
      
      console.log("TCL: onSend -> roomAlreadyExist", roomAlreadyExist);

      if(roomAlreadyExist.length === 0){
        this.chateeRoomRef.add({ id: this.props.chatterID })
      }
    })
    this.ref.add(messages[0]);
  }


  render() {

    return (
      <GiftedChat
        showUserAvatar={true}
        renderMessageImage={()=>{
          <View>
            <Image
              source={{ uri : 'https://placeimg.com/140/140/any' }}
            />
          </View>
        }}
        renderAvatarOnTop={true}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.uid,
          avatar: 'https://placeimg.com/140/140/any'
        }}
      />
    );
  }
}

const styles = StyleSheet.create({

});