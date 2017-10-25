import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = {
  container: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default class DeckListItem extends Component {

  onPress = _ => {
    let { title, onPress } = this.props;
    onPress(title);
  }

  render(){

    let { title, cardCount } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress} style={styles.container}>
        <Text>{title}</Text>
        <Text>{cardCount} cards</Text>
      </TouchableOpacity>
    )
  }
}
