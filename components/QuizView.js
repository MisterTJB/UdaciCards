import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { setLocalNotification } from '../util/notifications';

import { getDeck } from '../util/api';

const styles = {
  container: {
    marginTop: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80%'
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: 'white',
    padding: 22,
    width: '45%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'rgb(0, 122, 255)'
  },
  mainText: {
    textAlign: 'center',
    fontSize: 36,
    paddingLeft: 10,
    paddingRight: 10
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

  quizCompleted = _ => {
    setLocalNotification();
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

  componentWillUpdate(nextProps, nextState){
    // If the quiz moves in to the compeleted state, remove
    // local notifications
    if (nextState.questionIndex == nextState.questions.length) {
      this.quizCompleted();
    }
  }

  render(){

    let { questionIndex, questions, showAnswer } = this.state;
    let questionAnswer = questions[questionIndex];

    if (questionIndex == questions.length){
      return (
        <View style={[styles.container, , {justifyContent: 'center'}]}>
          <View>
            <Text style={styles.mainText}>You scored</Text>
            <Text style={[styles.mainText, {marginBottom: 100}]}>
            {((this.state.score / this.state.questions.length)*100).toFixed(2)}%
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {marginRight: 10}]} onPress={this.restart}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.backToDeck}>
              <Text style={styles.buttonText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (!questionAnswer) return <View style={styles.container}></View>

    if (showAnswer) {

      return (
        <View style={styles.container}>
          <Text style={styles.mainText}>{questionAnswer.answer}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'green', marginRight: 10}]} onPress={this.correct}>
              <Text style={[styles.buttonText, {color: 'white'}]}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]}  onPress={this.incorrect}>
              <Text style={[styles.buttonText, {color: 'white'}]}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    }

    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>{questionAnswer.question}</Text>
        <View>
          <Text>Question {questionIndex + 1} of {questions.length}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.showAnswer}>
          <Text style={styles.buttonText}>Show Answer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
