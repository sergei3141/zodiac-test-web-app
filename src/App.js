import './App.css'
import {useEffect, useState} from 'react'
import axios from 'axios';

const tg = window.Telegram.WebApp

function App() {

  const [flippedCards, setFlippedCards] = useState({});
  const [currentCardFlipped, setCurrentCardFlipped] = useState(null); 

  /* ========== Логика разворота карт ========== */
  const handleCardClick = (cardId, sign) => {
    if (currentCardFlipped === sign) { 
      setCurrentCardFlipped(null); 
      setFlippedCards((prevFlipped) => ({
        ...prevFlipped,
        [cardId]: false,
      }));
    } else { 
      console.log(sign)
      setFlippedCards((prevFlipped) => ({
        ...prevFlipped,
        [cardId]: true,
      }));
      setCurrentCardFlipped(sign); 
    }
  };

  const horoscope = ['aquarius', 'aries', 'cancer', 'capricorn',
                     'gemini', 'leo', 'libra', 'pisces',
                     'sagittarius', 'scorpio', 'taurus', 'virgo']

  useEffect(() => {
    tg.ready();

    const fetchData = async () => {
      try {
        const data = {
          "language": "original",
          "period": "today"
        };

        const response = await axios.post('https://poker247tech.ru/get_horoscope/', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [])  

  const onClose = () => {
    tg.close();
  };

  return (
    <div>
      <div className="container">
        {horoscope.map((el, index) => (
          <div
            key={index}
            className={`card ${flippedCards[index] ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index, el)} 
          >
            <div className="card-front">
              <img src="https://via.placeholder.com/600x200" alt="Картинка" />
              <div className="card-content">
                <h2 className="card-title">Название карточки {el}</h2>
                <p className="card-text">Описание карточки {index + 1}</p>
              </div>
            </div>
            <div className="card-back">
              <p>123</p> 
            </div>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default App;