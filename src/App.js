import { Component } from 'react';
import './App.css';
import MemoryCard from './Components/MemoryCard'
function generateDeck() {
    const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø']
    let deck = []
    for (let index = 0; index < 2; index++) {
      for (let i = 0; i < 8; i++) {
        const symb = symbols[i]
        deck.push(symb)
        }
    console.log(deck)
    }
}
generateDeck()
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck : [],
      pickedCards: []
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Memory Game</h1>
          <h3>Match cards to win</h3>
        </header>
        <div>
        <MemoryCard />  
        <MemoryCard />
        <MemoryCard />
        <MemoryCard />
        </div>
        <div>
        <MemoryCard />  
        <MemoryCard />
        <MemoryCard />
        <MemoryCard />
        </div>
        <div>
        <MemoryCard />  
        <MemoryCard />
        <MemoryCard />
        <MemoryCard />
        </div>
        <div>
        <MemoryCard />  
        <MemoryCard />
        <MemoryCard />
        <MemoryCard />
        </div>
      </div>
    );

  }
}

export default App;
