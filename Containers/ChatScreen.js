import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import RNfirebase from 'react-native-firebase';

export default class App extends Component {

  state = {
    messages: [],
  }

  componentWillMount() {
    this.roomRef = RNfirebase.firestore().collection('chatData');
    this.messagesRef = RNfirebase.firestore().collection('chatData').doc(this.chatID()).collection('chats');
    this.unsubscribe = this.messagesRef.orderBy('createdAt', "desc").onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = querySnapshot.docs.map((docSnapshot)=>{

      const message = docSnapshot.data();

      if(message.user._id!==this.props.uid){
        this.messagesRef.doc(docSnapshot.id).update("received", true)
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
    this.roomRef.doc(this.chatID()).set({
      usersInRoom : [{
          id : this.props.chatterID,
          name: this.props.uid===1? 'User 1' : 'User 2',
          avatar : `https://placeimg.com/140/140/${this.props.uid}`
      }, {
          id : this.props.chateeID,
          name: this.props.uid!==1? 'User 1' : 'User 2',
          avatar : `https://placeimg.com/140/140/${this.props.uid==1? 2 : 1}`
      }]
    })
    this.messagesRef.add(messages[0]);
  }

  renderBubble (props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#34495e"
          },
          left: {
            backgroundColor: "#ecf0f1"
          }
        }}
      />
    )
  }

  renderSend (props) {
    return <Send {...props} textStyle={{ color: "#34495e"  }} label={'Send'} />
  }



  render() {

    return (
      <GiftedChat
        renderBubble={this.renderBubble}
        showUserAvatar={true}
        renderSend={this.renderSend}
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
          name: this.props.uid===1? 'User 1' : 'User 2',
          _id: this.props.uid,
          avatar: `https://placeimg.com/140/140/${this.props.uid}`
        }}
      />
    );
  }
}

const styles = StyleSheet.create({

});