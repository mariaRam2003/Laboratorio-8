import { useState } from 'react';
import './App.css';


const cardImages = [
  { "src": "img/AlfaRomeo.png" },
  { "src": "img/Alpine.png" },
  { "src": "img/AstonMartin.png" },
  { "src": "img/F1L4.png" },
  { "src": "img/Ferrari.png" },
  { "src": "img/Mclaren.png" },
  { "src": "img/Mercedes.png" },
  { "src": "img/RedBull.png" }
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)


  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id:Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards,turns)


  return (
    <div className="App">
      <h1>Memoria Formula 1</h1>
      <div class="container">
        <button onClick={shuffleCards}>Nuevo Juego</button>
        <div class="f1-car"></div>

        <div className="card-grid"></div>
          {cards.map(card => (
            <div className='card' key={card.id}>
              <div>
                <img className='front' src={card.src} alt="card front"/>
                <img className='back' src="/img/Cover.png" alt='card back' />
              </div>
            </div>
          ))}

      </div>
     
    </div>
  );
}

export default App