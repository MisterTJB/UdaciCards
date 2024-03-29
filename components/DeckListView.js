import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { getDecks, registerObserver, removeObserver } from '../util/api';
import { FontAwesome } from '@expo/vector-icons';
import DeckListItem from './DeckListItem';

export default class DeckListView extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "UdaciCards",
    tabBarLabel: "My Decks",
    tabBarIcon: ({ tintColor }) => <FontAwesome name='stack-overflow' size={24} color={tintColor} />
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
    }).catch(_ => {
      this.setState({ deck: [] })
    })
  }

  componentDidMount(){
    registerObserver(this);
    this.update();
  }

  componentWillUnmount(){
    removeObserver(this);
  }

  keyExtractor = (item, index) => index

  renderDeckListItem = ( {item} ) => {
    return <DeckListItem onPress={this.onPress} title={item.title} cardCount={item.cardCount}/>
  }

  onPress = (title) => {
    const { navigate } = this.props.navigation;
    navigate("DeckView", { title })
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
    return (
        <FlatList style={{height: 100}} data={this.state.deck}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderDeckListItem}
                  ItemSeparatorComponent={this.renderSeparator}
                   />
    )
  }
}
