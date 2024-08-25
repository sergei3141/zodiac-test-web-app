import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header'; 
import CardList from './components/CardList';
import CardDescription from './components/CardDescription';
import Footer from './components/Footer';
import horoscope from './data';

const tg = window.Telegram.WebApp;
const timeToFlipCard = 200;

function App() {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState({});
  const [userLanguage, setUserLanguage] = useState('en');
  const [currentForecast, setCurrentForecast] = useState('Loading...');
  const [selectedSign, setSelectedSign] = useState(null);

  useEffect(() => {
    tg.ready();
    console.log(tg)
    debugger;
    /* ======= Если есть русский язык, выбираем русский. В остальных английский ======= */
    setUserLanguage(tg?.initDataUnsafe?.user?.language_code === 'ru' ? 'ru' : 'en');
  }, []);

  const fetchData = async (cardId, sign, language) => {
    /* ======= Переворот карт ======= */
    setFlippedCards({});
      setFlippedCards((prevFlipped) => ({
        ...prevFlipped,
        [cardId]: true,
      }));

    await new Promise((resolve) => setTimeout(resolve, timeToFlipCard));
    
    try {
      const response = await axios.post('https://poker247tech.ru/get_horoscope/', {
          sign: sign.toLowerCase(),
          language: language === "ru" ? "original" : "en",
          period: 'today',
        }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setCurrentForecast(response.data.horoscope);
      setSelectedSign(sign); 
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const handleReadMore = () => {
    if (selectedSign) { 
      navigate(`/card/${selectedSign}`); 
    }
  };

  const changeLanguage = () => {
    /* Меняем язык и запрашиваем данные с новым языком */
    const currentLanguage = userLanguage === 'ru' ? 'en' : 'ru'
    setUserLanguage(currentLanguage);
    fetchData(null, selectedSign, currentLanguage); 
  };

  return (
    <div>
      <Header userLanguage={userLanguage} changeLanguage={changeLanguage} />
      <Routes>
        <Route
          path="/"
          element={
            <CardList
              horoscope={horoscope}
              flippedCards={flippedCards}
              fetchData={fetchData}
              userLanguage={userLanguage}
              handleReadMore={handleReadMore}
              currentForecast={currentForecast}
            />
          }
        />
        <Route
          path="/card/:sign"
          element={
            <CardDescription
              userLanguage={userLanguage}
              currentForecast={currentForecast}
              selectedSign={selectedSign}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;