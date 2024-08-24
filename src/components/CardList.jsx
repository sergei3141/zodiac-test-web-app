import React from 'react';
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const CardList = ({ horoscope, flippedCards, fetchData, userLanguage, handleReadMore, currentForecast }) => {
  return (
    <div className="container">
      {horoscope.map((el, index) => (
        <div
          key={index}
          className={`card ${flippedCards[index] ? 'flipped' : ''}`}
        >
          <div
            className="card-front"
            onClick={() => {
              fetchData(index, el.nameEn, userLanguage);
            }}
          >
            <div className="card-content">
              <h2 className="card-title">
                {userLanguage === 'ru' ? el.nameRu : el.nameEn}
              </h2>
              <p className="card-text">{el.period}</p>
              <div className="icon-iconify">
                <Icon icon={el.icon} />
              </div>
            </div>
          </div>
          <div className="card-back">
            <p>
              {currentForecast.match(/^(.*?)\./)?.[1].trim() ||
                'Loading...'}
            </p>
            <button className="button" onClick={handleReadMore}>
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;