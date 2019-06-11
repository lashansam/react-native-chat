import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class App extends Component {
  render() {
    return (
        <View>
            <Text>{this.props.uid}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({

});