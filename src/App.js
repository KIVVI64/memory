import { useEffect, useState, useRef } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardsImages = [
  { "src": "/img/grochu.png", matched: false },
  { "src": "/img/gruby.png", matched: false },
  { "src": "/img/kamil.png", matched: false },
  { "src": "/img/myko.png", matched: false },
  { "src": "/img/szymon.png", matched: false },
  { "src": "/img/tomek.png", matched: false }
]

function App() {

  const [Cards, setCards] = useState([])
  const [Turns, setTurns] = useState(0)

  const [ChoiceOne, setChoiceOne] = useState(null)
  const [ChoiceTwo, setChoiceTwo] = useState(null)
  const myRef = useRef(null)

  // losowanie kart
  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
    setTimeout(() => {
      executeScroll()
    }, 1000);
  }

  const executeScroll = () => myRef.current.scrollIntoView()

  // handle choice
  const handleChoice = (card) => {
    console.log(card);
    // kurwa sprytne, rokmin to
    ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //useEffect(() => {
  //  shuffleCards()//first execution
  //},[]);
 

  //compare 2 selections
  useEffect(() => {
    if (ChoiceOne && ChoiceTwo) {
      if (ChoiceOne.src === ChoiceTwo.src) {
        console.log("Pasują!");
        //update
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === ChoiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurns()
      } else {
        console.log("Nie pasują :(");
        setTimeout(() => {
          resetTurns()
        }, 1000);
      }
    }
  }, [ChoiceOne, ChoiceTwo])

  //console.log(Cards);

  //reset turns
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
  }

  return (
    <div className="App">
      <h1>Gra: Debile</h1>
      <button
        onClick={() => {
          shuffleCards();
        }}
        className="bubbly-button">
          Nowa gra
      </button>

      <div ref={myRef} className="card-grid">
        {Cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            // odwracasz jak prawda
            flipped={card === ChoiceOne || card === ChoiceTwo || card.matched}
          />
        ))}
      </div>
      {Turns > 0 &&
        <p>
          Jesteś debilem, zrobiłeś już {Turns} {Turns === 1 ? 'ruch' : Turns >= 5 ? 'ruchów' : 'ruchy'}.
        </p>
      }
    </div>
  );
}

export default App;
