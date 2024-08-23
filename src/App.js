import './App.css'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFishFins } from '@fortawesome/free-solid-svg-icons';

const tg = window.Telegram.WebApp
const timeToFlipCard = 200

function App() {

  const [flippedCards, setFlippedCards] = useState({});
  const [currentCardFlipped, setCurrentCardFlipped] = useState(null);
  const [userLanguage, setUserLanguage] = useState('en');  
  const [currentForecast, setCurrentForecast] = useState('Loading...')

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
    /* Инициализируем Телеграм и узнаём язык системы */
    tg.ready();
    setUserLanguage(tg?.initDataUnsafe?.user?.language_code ? 'ru' : 'en'); 
  }, [])  

  const fetchData = async (cardId, sign) => {
    setFlippedCards({}); 
    setCurrentCardFlipped(null); 

    if (currentCardFlipped !== sign) { 
      setFlippedCards((prevFlipped) => ({
        ...prevFlipped,
        [cardId]: true,
      }));
    }

    await new Promise(resolve => setTimeout(resolve, timeToFlipCard)); 
    try {
      const data = {
        "sign": sign.toLowerCase(),
        "language": userLanguage === "ru" ? "original" : "en",
        "period": "today"
      };

      const response = await axios.post('https://poker247tech.ru/get_horoscope/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCurrentForecast(response.data.horoscope)
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    tg.close();
  };

  const changeLanguage = () => {
    setUserLanguage(userLanguage === 'ru' ? 'en' : 'ru');
    fetchData()
  }

  return (
    <div>
      <header className="header">
        <div className="language">
          ↺
        </div>
        <div onClick={changeLanguage} className="language">{userLanguage === 'ru'? <div>Ru</div> : <div>En</div>}</div>
      </header>
      <div className="container">
        {horoscope.map((el, index) => (
          <div
            key={index}
            className={`card ${flippedCards[index] ? 'flipped' : ''}`}
            onClick={() => fetchData(index, el.nameEn)} 
          >
            <div className="card-front">
              <div className="card-content">
                <h2 className="card-title">{userLanguage === 'ru' ? el.nameRu : el.nameEn}</h2>
                <p className="card-text">{el.period}</p>
                <FontAwesomeIcon icon={faFishFins} className="icon-card icon-front"/>
              </div>
            </div>
            <div className="card-back">
              <p>{currentForecast.match(/^(.*?)\./)[1].trim()}...</p> 
              <button className="button">Read more</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default App;