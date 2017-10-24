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

export default class DeckListItem extends Component {

  render(){

    let { title, cardCount } = this.props;

    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{cardCount} cards</Text>
      </View>
    )
  }
}
