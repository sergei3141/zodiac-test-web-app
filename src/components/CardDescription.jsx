import React from 'react';
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { initBackButton } from '@telegram-apps/sdk';
import horoscope from '../data';

const [backButton] = initBackButton();

const CardDescription = ({ currentForecast, selectedSign, userLanguage }) => {

    const sign = horoscope.find(sign => sign.nameEn === selectedSign);

    /* Работа кнопки НАЗАД (актуально только для Телеграм) */
     const navigate = useNavigate();
    backButton.show()
    backButton.on('click', () => {
        backButton.hide()
        navigate(-1) 
    });    

  return (
    <div className="card-description">
      <div className="card-description-header">
        <Icon className="card-description-icon" icon={sign.icon} />
        <h1>{userLanguage === "en" ? selectedSign : (sign ? sign.nameRu : '')}</h1>
        <Icon className="card-description-icon" icon={sign.icon} />
      </div>
      <div className='card-description-period'>{sign.period}</div>
      <p className="description-text">{currentForecast}</p>
      <button onClick={() => navigate('/')} className="button">
        <FontAwesomeIcon icon={faHouse} />
      </button>
    </div>
  );
};

export default CardDescription;