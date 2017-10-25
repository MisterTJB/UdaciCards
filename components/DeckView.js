import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = {
  container: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default class DeckView extends Component {

  render(){

    return (
      <View style={styles.container}>
        <Text>Deck View</Text>
        <Text>A deck view</Text>
      </View>
    )
  }
}
