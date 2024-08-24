import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { initBackButton } from '@telegram-apps/sdk';

const [backButton] = initBackButton();

const CardDescription = ({ currentForecast, selectedSign }) => {

    const navigate = useNavigate();

    useEffect(()=>{
        initBackButton();
        backButton.on('click', () => {
            navigate(-1)
        });    
    }, [])

  return (
    <div className="card-description">
      <div>
        <p></p>
        <h1>{selectedSign}</h1>
        <p></p>
      </div>
      <p className="description-text">{currentForecast}</p>
      <button onClick={() => navigate('/')} className="button">
        <FontAwesomeIcon icon={faHouse} />
      </button>
    </div>
  );
};

export default CardDescription;