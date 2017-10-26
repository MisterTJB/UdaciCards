// api.js comprises helper functions for storing and retrieving data

import { AsyncStorage } from 'react-native'

let observers = []

export const registerObserver = o => {
  observers.push(o);
}

const notifyObservers = _ => {
  observers.map( (o, i) => {
    o.update();
  });
}

export const removeObserver = o => {
  observers = observers.filter( observer => observer !== o)
}

/*
Return all of the decks along with their titles, questions, and answers.
*/
export const getDecks = _ => {
  return AsyncStorage.getItem('DECKS')
    .then( data => {
      return JSON.parse(data)
    })

}

/*
Take in a single id argument and return the deck associated with that id.
*/
export const getDeck = (id) => {
  return AsyncStorage.getItem('DECKS').then( data => {
    return JSON.parse(data)[id]
  })
}

/*
Take in a single title argument and add it to the decks.
*/
export const saveDeckTitle = (title) => {
  let newDeck = { title, questions: []}
  return AsyncStorage.mergeItem('DECKS', JSON.stringify({ [title]: newDeck }))
                      .then(notifyObservers())
}

/*
Take in two arguments, title and card, and will add the card to the list of
questions for the deck with the associated title.
*/
export const addCardToDeck = (title, card) => {
  return AsyncStorage.getItem('DECKS').then(
    data => {
      let cards = JSON.parse(data)[title].questions
      let newDeck = { title, questions: [...cards, card] }
      return AsyncStorage.mergeItem('DECKS', JSON.stringify({ [title]: newDeck })
      ).then(notifyObservers())
    }
  )
}
