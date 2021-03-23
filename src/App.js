import './App.css';
import MemoryCard from './Components/MemoryCard'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
        <h3>Match cards to win</h3>
      </header>
      <MemoryCard />
    </div>
  );
}

export default App;
