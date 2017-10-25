import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { } from '../util/api';

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

export default class QuizView extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Add A Card"
  });

  render(){
    return (
      <View style={styles.container}>
        <Text>Quiz View</Text>
      </View>
    );
  }
}
