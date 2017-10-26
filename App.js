import React from 'react';
import { StatusBar, View } from 'react-native';
import { Constants } from 'expo';
import DeckListView from './components/DeckListView';
import { TabNavigator, StackNavigator } from 'react-navigation';
import NewDeckView from './components/NewDeckView';
import DeckView from './components/DeckView';
import NewQuestion from './components/NewQuestion';
import QuizView from './components/QuizView';
import { setLocalNotification } from './util/notifications';

import { AsyncStorage } from 'react-native';

const UdaciCardsTabNavigator = TabNavigator({
  Decks: {
    screen: DeckListView,
  },
  NewDeck: {
    screen: NewDeckView
  }
}, {
  tabBarOptions: {
    style: {
      height: 56,
      backgroundColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const UdaciCardsStackNavigator = StackNavigator({
  Home: {
    screen: UdaciCardsTabNavigator
  },
  DeckView: {
    screen: DeckView,
    path: 'deck/:title'
  },
  NewQuestion: {
    screen: NewQuestion,
    path: 'new/:title'
  },
  QuizView: {
    screen: QuizView,
    path: 'quiz/:title'
  }
});


export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <UdaciCardsStackNavigator />
      </View>
    )
  }
}
