import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import RNfirebase from 'react-native-firebase';
import { Actions as NavActions } from "react-native-router-flux";
import { List, Avatar } from 'react-native-paper';

export default class App extends Component {

  state = {
    chatRooms: [],
  }

  componentWillMount() {
    this.ref = RNfirebase.firestore().collection(`${this.props.uid}_rooms`)
    console.log("TCL: App -> componentWillMount -> this.props.uid", this.props.uid)
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
                  <View style={{ backgroundColor : '#34495e', margin : 10, borderRadius : 10, borderWidth : 1, borderColor : '#42586E' }}>
                    <List.Item
                      titleStyle={{ color : 'white'}}
                      descriptionStyle={{ color : '#7D8F98'}}
                      title={`Chat with User ${item.id}`}
                      description="recent chat"
                      left={props => <View style={{ justifyContent : 'center', alignItems : 'center'}}><Avatar.Image size={40} source={{ uri : 'https://placeimg.com/140/140/any'}}/></View>}
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