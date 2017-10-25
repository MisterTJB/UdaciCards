import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getDeck } from '../util/api';
import NewQuestion from './NewQuestion';

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 100,
    marginBottom: 100
  },
  deckTitle: {
    fontSize: 24
  },
  cardCount: {
    fontSize: 20
  },
  buttonContainer: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    height: 44,
    width: '40%',
    backgroundColor: 'green',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  }
}

/*
Add the relevant data to the UI, retrieved from api.getDeck(title).
This will be a Text element with the deck title, a Text element with the number
of cards in the deck*, a TouchableOpacity with the option to start a quiz, and
a TouchableOpacity with the option to add a new question to the deck
*/
export default class DeckView extends Component {

  state = {
    title: '',
    questions: []
  }

  componentDidMount(){
    let { title } = this.props.navigation.state.params;

    getDeck(title).then( deck => {
      this.setState({ title, ...deck })
    })
  }

  navigateToNewQuestion = _ => {
    let { navigate } = this.props.navigation;
    let { title } = this.state.title;
    navigate('NewQuestion', { title })
  }

  navigateToQuiz = _ => {
    let { navigate } = this.props.navigation;
    let { title } = this.state.title;
    navigate('QuizView', { title })
  }

  render(){

    let { title, questions } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text>{questions.length} cards</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.navigateToNewQuestion}>
            <Text style={{color: 'white'}}>Add Question</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.navigateToQuiz}>
            <Text style={{color: 'white'}}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
