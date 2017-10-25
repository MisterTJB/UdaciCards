import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { addCardToDeck } from '../util/api';

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

export default class NewQuestion extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Add A Card"
  });

  state = {
    question: '',
    answer: ''
  }

  saveCard = _ => {
    addCardToDeck(this.state.title, this.state.question)
      .then( _ => {
        const { navigate } = this.props.navigation;
        navigate.back()
        this.setState({ answer: '', question: ''})

      })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text>Question</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
          />
        </View>
        <View style={styles.input}>
          <Text>Answer</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.saveCard}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
