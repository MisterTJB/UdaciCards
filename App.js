import React from 'react';
import { StatusBar, View } from 'react-native';
import { Constants } from 'expo';
import DeckListView from './components/DeckListView';
import { TabNavigator } from 'react-navigation';
import { populateDummyData, getDecks, getDeck, saveDeckTitle, addCardToDeck } from './util/api';

const UdaciCardsTabNavigator = TabNavigator({
  Decks: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks'
    },
  },
  NewDeck: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: '#123456',
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


export default class App extends React.Component {

  state = {
    data: null
  }

  componentDidMount(){
    populateDummyData()
      .then( _ => {
        return saveDeckTitle('NEW DECK')
      })
      .then( _ => {
        return getDecks()
      })
      .then( _ => {
        return addCardToDeck('NEW DECK', { question: "A QUESTION", answer: "ANSWER"})
      })
      .then( _ => {
        return getDeck("NEW DECK")
      })
      .then( data => {
        this.setState({ data })
      })


  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar translucent />
        </View>
        <UdaciCardsTabNavigator />
      </View>
    )
  }
}
