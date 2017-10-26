import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getDeck, registerObserver, removeObserver } from '../util/api';
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

export default class DeckView extends Component {

  state = {
    title: '',
    questions: []
  }

  update = _ => {

    let { title } = this.props.navigation.state.params;
    getDeck(title).then( deck => {
      this.setState({ title: deck.title, questions: deck.questions });
    })
  }

  componentDidMount(){
    registerObserver(this);
    this.update();
  }

  componentWillUnmount(){
    removeObserver(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    return true;
  }

  navigateToNewQuestion = _ => {
    let { navigate } = this.props.navigation;
    let { title } = this.state;
    navigate('NewQuestion', { title })
  }

  navigateToQuiz = _ => {
    let { navigate } = this.props.navigation;
    let { title } = this.state;
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
