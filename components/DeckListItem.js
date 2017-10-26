import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  deckTitle: {
    fontSize: 24,
    paddingLeft: 24,
    fontWeight: 'bold',
    flexBasis: '70%'
  },
  deckCardinality: {
    paddingRight: 24
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
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.deckCardinality}>{cardCount} { cardCount === 1 ? "card" : "cards"}</Text>
      </TouchableOpacity>
    )
  }
}
