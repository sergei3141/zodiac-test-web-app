import './App.css'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFishFins } from '@fortawesome/free-solid-svg-icons';

const tg = window.Telegram.WebApp

function App() {

  const [flippedCards, setFlippedCards] = useState({});
  const [currentCardFlipped, setCurrentCardFlipped] = useState(null);
  const [userLanguage, setUserLanguage] = useState('en');  

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

      /* ========== Автопереворот карт в исходное ========== */
      if (currentCardFlipped) { 
        const flippedCardIndex = horoscope.findIndex(item => item.nameRu === currentCardFlipped);
        setFlippedCards((prevFlipped) => ({
          ...prevFlipped,
          [flippedCardIndex]: false,
        }));
      }

      setFlippedCards((prevFlipped) => ({
        ...prevFlipped,
        [cardId]: true,
      }));
      setCurrentCardFlipped(sign); 
    }
  };

  const horoscope = [
    {nameEn: 'Aquarius', nameRu: 'Водолей', icon: 'faFishFins', period: '21.01 - 18.02'},
    {nameEn: 'Aries', nameRu:'Овен', icon: 'faFishFins', period: '21.03 - 19.04'},
    {nameEn: 'Cancer', nameRu:'Рак', icon: 'faFishFins', period: '22.06 - 22.07'},

    {nameEn: 'Capricorn', nameRu:'Козерог', icon: 'faFishFins', period: '22.12 - 20.11'},
    {nameEn: 'Gemini', nameRu:'Близнецы', icon: 'faFishFins', period: '21.05 - 20.06'},
    {nameEn: 'Leo', nameRu:'Лев', icon: 'faFishFins', period: '23.07 - 22.08'},

    {nameEn: 'Libra', nameRu: 'Весы', icon: 'faFishFins', period: '23.09 - 23.10'},
    {nameEn: 'Pisces', nameRu: 'Рыбы', icon: 'faFishFins', period: '19.02 - 20.03'},
    {nameEn: 'Sagittarius', nameRu: 'Стрелец', icon: 'faFishFins', period: '23.11 - 21.12'},

    {nameEn: 'Scorpio', nameRu: 'Cкорпион', icon: 'faFishFins', period: '24.10 - 22.11'},
    {nameEn: 'Taurus', nameRu: 'Телец', icon: 'faFishFins', period: '20.04 - 20.05'},
    {nameEn: 'Virgo', nameRu: 'Дева', icon: 'faFishFins', period: '23.08 - 22.09'},
  ]
  
  useEffect(() => {
    tg.ready();
    setUserLanguage(tg.initDataUnsafe?.user?.language_code || 'en');

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

  const changeLanguage = () => {
    if(userLanguage === 'ru'){
      setUserLanguage('en')
    }else{
      setUserLanguage('ru')
    }
  }

  return (
    <div>
      <div className="container">
        {horoscope.map((el, index) => (
          <div
            key={index}
            className={`card ${flippedCards[index] ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index, el.nameRu)} 
          >
            <div className="card-front">
            <FontAwesomeIcon icon={faFishFins} />
              <div className="card-content">
                <h2 className="card-title">{userLanguage === 'ru' ? el.nameRu : el.nameEn}</h2>
                <p className="card-text">Описание карточки {index + 1}</p>
              </div>
            </div>
            <div className="card-back">
              <p>123</p> 
            </div>
          </div>
        ))}
      </div>
      <button onClick={changeLanguage}>{userLanguage === 'ru'? <div>Rus</div> : <div>Eng</div>}</button>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default App;