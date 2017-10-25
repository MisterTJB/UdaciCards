import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { saveDeckTitle } from '../util/api';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    marginBottom: 50
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'green',
    padding: 22,
    borderRadius: 5
  }
}

export default class NewDeckView extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Add a Deck",
    tabBarLabel: "Add Deck"
  });

  state = {
    title: ''
  }

  saveDeck = _ => {
    saveDeckTitle(this.state.title)
      .then( _ => {
        this.setState({ title: '' })
      })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text>New Deck Title</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.saveDeck}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
