import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { getDeck } from '../util/api';

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
  buttonContainer: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'green',
    padding: 22,
    borderRadius: 5
  }
}

export default class QuizView extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.title
  });

  state = {
    showAnswer: false,
    questions: [],
    questionIndex: 0,
    score: 0
  }

  componentDidMount(){
    let { title } = this.props.navigation.state.params;
    getDeck(title).then( ({ title, questions }) => {
      this.setState({ questions })
    })
  }

  showAnswer = _ => {
    this.setState({showAnswer: true})
  }

  correct = _ => {
    this.setState({
      showAnswer: false,
      score: this.state.score + 1,
      questionIndex: this.state.questionIndex + 1
    })
  }

  incorrect = _ => {
    this.setState({
      showAnswer: false,
      questionIndex: this.state.questionIndex + 1
    })
  }

  restart = _ => {
    this.setState({
      showAnswer: false,
      questionIndex: 0,
      score: 0
    })
  }

  backToDeck = _ => {
    let { goBack } = this.props.navigation;
    goBack();
  }

  render(){

    let { questionIndex, questions, showAnswer } = this.state;
    let questionAnswer = questions[questionIndex];

    if (questionIndex == questions.length){
      return (
        <View style={styles.container}>
          <View>
            <Text>{this.state.score}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}  onPress={this.restart}>
              <Text>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.backToDeck}>
              <Text>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (!questionAnswer) return <View style={styles.container}></View>

    if (showAnswer) {

      return (
        <View style={styles.container}>
          <View>
            <Text>Question {questionIndex + 1} of {questions.length}</Text>
          </View>
          <Text>{questionAnswer.answer}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.button} onPress={this.correct}>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]}  onPress={this.incorrect}>
              <Text>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    }

    return (
      <View style={styles.container}>
        <View>
          <Text>Question {questionIndex + 1} of {questions.length}</Text>
        </View>
        <Text>{questionAnswer.question}</Text>
        <TouchableOpacity style={styles.button} onPress={this.showAnswer}>
          <Text>Show Answer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
