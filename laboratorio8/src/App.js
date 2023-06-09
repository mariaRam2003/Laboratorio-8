import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "img/AlfaRomeo.png", matched: false },
  { "src": "img/Alpine.png", matched: false },
  { "src": "img/AstonMartin.png", matched: false },
  { "src": "img/F1L4.png", matched: false },
  { "src": "img/Ferrari.png", matched: false },
  { "src": "img/Mclaren.png", matched: false },
  { "src": "img/Mercedes.png", matched: false },
  { "src": "img/RedBull.png", matched: false }
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id:Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }


  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>F1 Memory Grand Prix</h1>
      <div class="container">
        <button onClick={shuffleCards}>New Game</button>
        <div class="f1-car"></div>
      </div>

      <div className="card-grid">
          {cards.map(card => (
            <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
          ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App