import { Component } from 'react';
import './App.css';
import MemoryCard from './Components/MemoryCard'
function generateDeck() {
    const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø']
    let deck = []
    for (let index = 0; index < 2; index++) {
      for (let i = 0; i < 8; i++) {
        const symb = symbols[i%8]
        const newCard = {symbol: symb, isFlipped: false}
        deck.push(newCard)
        }
    }
    return deck
}
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck
}

const shuffledDeck = shuffle(generateDeck())

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck : shuffledDeck,
      pickedCards: []
    }
  }

  pickCard = (cardIndex) => {
    if (this.state.deck[cardIndex].isFlipped === true) {
      return;
    }
    const cardToFlip = {...this.state.deck[cardIndex]}
    cardToFlip.isFlipped = true;

    const newPickedCards = this.state.pickedCards.concat(cardIndex)
    
    const newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip
      }
      return card
    }) 
    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    });

  
  }

  render() {
    const cardsJSX = this.state.deck.map((card, index) => {
      return <MemoryCard symbol={card.symbol} isFlipped={card.isFlipped} pickCard={() => this.pickCard(index)} key={index}/>
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1>Memory Game</h1>
          <h3>Match cards to win</h3>
        </header>
        <div>
        {cardsJSX.slice(0,4)}
        </div>
        <div>
        {cardsJSX.slice(4,8)}
        </div>
        <div>
        {cardsJSX.slice(8,12)}
        </div>
        <div>
        {cardsJSX.slice(12,16)}
        </div>
      </div>
    );

  }
}

export default App;
