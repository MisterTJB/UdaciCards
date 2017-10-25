import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

import { getDecks, registerObserver } from '../util/api';
import DeckListItem from './DeckListItem';

export default class DeckListView extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "UdaciCards",
    tabBarLabel: "My Decks",
    tabBarOnPress: (nextRoute, jumpToIndex) => {
      jumpToIndex(nextRoute.index);
    }
  });

  state = {
    deck: []
  }

  update = _ => {
    getDecks().then( data => {

      let deck = Object.keys(data).map( deckName => {
        return {
          title: data[deckName].title,
          cardCount: data[deckName].questions.length
        }
      })
      this.setState({
        deck
      })
    })
  }

  componentWillMount(){
    registerObserver(this);
    this.update();
  }

  keyExtractor = (item, index) => index

  renderDeckListItem = ( {item} ) => {
    return <DeckListItem title={item.title} cardCount={item.cardCount}/>
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  render(){
    console.log("Will render")
    return (
        <FlatList style={{height: 100, backgroundColor: '#123456'}} data={this.state.deck}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderDeckListItem}
                  ItemSeparatorComponent={this.renderSeparator}
                   />
    )
  }
}
