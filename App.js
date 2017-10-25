import React from 'react';
import { StatusBar, View } from 'react-native';
import { Constants } from 'expo';
import DeckListView from './components/DeckListView';
import { TabNavigator } from 'react-navigation';
import NewDeckView from './components/NewDeckView';

const UdaciCardsTabNavigator = TabNavigator({
  Decks: {
    screen: DeckListView,
  },
  NewDeck: {
    screen: NewDeckView
  }
}, {
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
    shouldUpdate: false
  }

  shouldUpdate = (shouldUpdate) => {
    this.setState( { shouldUpdate })
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
