import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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

export default class NewQuestion extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Add A Card"
  });

  state = {
    question: '',
    answer: ''
  }

  saveCard = _ => {
    let qa = {
      question: this.state.question,
      answer: this.state.answer
    }

    let { title } = this.props.navigation.state.params;

    addCardToDeck(title, qa)
      .then( _ => {
        this.setState({ answer: '', question: ''})
      })
  }

  render(){
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
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
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
