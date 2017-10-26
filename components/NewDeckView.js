import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
    borderWidth: 1,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'white',
    padding: 16,
    paddingLeft: 44,
    paddingRight: 44,
    borderRadius: 5
  },
  buttonText: {
    color: 'rgb(0, 122, 255)'
  }
}

export default class NewDeckView extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Add a Deck",
    tabBarLabel: "Add Deck",
    tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={24} color={tintColor} />
  });

  state = {
    title: ''
  }

  saveDeck = _ => {
    saveDeckTitle(this.state.title)
      .then( _ => {
        const { navigate } = this.props.navigation;
        navigate('DeckView', { title: this.state.title })
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
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
