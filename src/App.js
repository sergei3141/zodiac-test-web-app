import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark, faHouse, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const tg = window.Telegram.WebApp;
const timeToFlipCard = 200;

function App() {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState({});
  const [userLanguage, setUserLanguage] = useState('en');
  const [currentForecast, setCurrentForecast] = useState('Loading...');
  const [selectedSign, setSelectedSign] = useState(null);

  const horoscope = [
    { nameEn: 'Aquarius', nameRu: 'Водолей', icon: 'icon-park-outline:aquarius', period: '21.01 - 18.02' },
    { nameEn: 'Aries', nameRu: 'Овен', icon: "icon-park-outline:aries", period: '21.03 - 19.04' },
    { nameEn: 'Cancer', nameRu: 'Рак', icon: 'icon-park-outline:cancer', period: '22.06 - 22.07' },
    { nameEn: 'Capricorn', nameRu: 'Козерог', icon: 'tabler:zodiac-capricorn', period: '22.12 - 20.11' },
    { nameEn: 'Gemini', nameRu: 'Близнецы', icon: 'icon-park-outline:gemini', period: '21.05 - 20.06' },
    { nameEn: 'Leo', nameRu: 'Лев', icon: 'icon-park-outline:leo', period: '23.07 - 22.08' },
    { nameEn: 'Libra', nameRu: 'Весы', icon: 'icon-park-outline:libra', period: '23.09 - 23.10' },
    { nameEn: 'Pisces', nameRu: 'Рыбы', icon: 'icon-park-outline:pisces', period: '19.02 - 20.03' },
    { nameEn: 'Sagittarius', nameRu: 'Стрелец', icon: 'streamline:bow', period: '23.11 - 21.12' },
    { nameEn: 'Scorpio', nameRu: 'Cкорпион', icon: 'icon-park-outline:scorpio', period: '24.10 - 22.11' },
    { nameEn: 'Taurus', nameRu: 'Телец', icon: 'icon-park-outline:taurus', period: '20.04 - 20.05' },
    { nameEn: 'Virgo', nameRu: 'Дева', icon: 'icon-park-outline:virgo', period: '23.08 - 22.09' },
  ];

  useEffect(() => {
    tg.ready();
    setUserLanguage(tg?.initDataUnsafe?.user?.language_code ? 'ru' : 'en');
  }, []);

  const fetchData = async (cardId, sign, language) => {
    setFlippedCards({});


      setFlippedCards((prevFlipped) => ({
        ...prevFlipped,
        [cardId]: true,
      }));

debugger
    await new Promise((resolve) => setTimeout(resolve, timeToFlipCard));
    try {
      const data = {
        sign: sign.toLowerCase(),
        language: language === "ru" ? "original" : "en",
        period: 'today',
      };

      const response = await axios.post('https://poker247tech.ru/get_horoscope/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setCurrentForecast(response.data.horoscope);
      setSelectedSign(sign); 
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadMore = () => {
    if (selectedSign) { 
      navigate(`/card/${selectedSign}`); 
    }
  };

  const onClose = () => {
    tg.close();
  };

  const changeLanguage = () => {
    const currentLanguage = userLanguage === 'ru' ? 'en' : 'ru'
    setUserLanguage(currentLanguage);
    fetchData(null, selectedSign, currentLanguage); 
  };

  return (

      <div>
        <header className="header">
          <div onClick={changeLanguage} className="language">
            {userLanguage === 'ru' ? <div>Ru</div> : <div>En</div>}
          </div>
          <div className="userinfo">
            <p className='username'>
              {tg?.initDataUnsafe?.user?.first_name || 'Name'}
            </p>
            <img src={tg?.initDataUnsafe?.user?.photo_url || "https://sun1-96.userapi.com/s/v1/ig2/H3p4pdUAc0vEmbkVPrJV9-5q_jx0I8Glhyl7L7shix1JFs_ZtnjAOoDtAkhCmxlFEDQ25MNcju94graeWqlfRttb.jpg?size=50x50&quality=96&crop=8,12,974,974&ava=1"} className="userphoto" alt="user_photo"></img>
          </div>
        </header>
        <Routes> 
          <Route
            path="/"
            element={
              <div className="container">
                {horoscope.map((el, index) => (
                  <div
                    key={index}
                    className={`card ${flippedCards[index] ? 'flipped' : ''}`}
                   
                  >
                    <div className="card-front"
                     onClick={() => {fetchData(index, el.nameEn, userLanguage)}}>
                      <div className="card-content">
                        <h2 className="card-title">{userLanguage === 'ru' ? el.nameRu : el.nameEn}</h2>
                        <p className="card-text">{el.period}</p>
                        <div className='icon-iconify'>
                          <Icon icon={el.icon} />
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <p>{currentForecast.match(/^(.*?)\./)?.[1].trim() || 'Loading...'}</p>
                      <button className="button" onClick={handleReadMore}>
                      <FontAwesomeIcon icon={faAnglesRight} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <Route
            path="/card/:sign"
            element={
              <div className="card-description">
                <div>
                  <p></p>
                  <h1>{selectedSign}</h1>
                  <p></p>
                </div>
                <p className="description-text">{currentForecast}</p>
                <button onClick={() => navigate('/')} className='button'>
                <FontAwesomeIcon icon={faHouse} />
                </button>
              </div>
            }
          />
        </Routes>
        <footer className="footer" onClick={onClose}>
        <FontAwesomeIcon icon={faRectangleXmark} />
        </footer>
      </div>

  );
}

export default App;