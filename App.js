import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { populateDummyData, getDecks, getDeck, saveDeckTitle, addCardToDeck } from './util/api';

export default class App extends React.Component {

  state = {
    data: null
  }

  componentDidMount(){
    populateDummyData()
      .then( _ => {
        return saveDeckTitle('NEW DECK')
      })
      .then( _ => {
        return getDecks()
      })
      .then( _ => {
        return addCardToDeck('NEW DECK', { question: "A QUESTION", answer: "ANSWER"})
      })
      .then( _ => {
        return getDeck("NEW DECK")
      })
      .then( data => {
        this.setState({ data })
      })


  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.data && JSON.stringify(this.state.data)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
