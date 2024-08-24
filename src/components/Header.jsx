import React from 'react';

const tg = window.Telegram.WebApp;

const Header = ({ userLanguage, changeLanguage }) => {

  const userData = tg?.initDataUnsafe?.user;
  const firstName = userData?.first_name || 'Name';
  const photoUrl = userData?.photo_url || 'https://sun1-96.userapi.com/s/v1/ig2/H3p4pdUAc0vEmbkVPrJV9-5q_jx0I8Glhyl7L7shix1JFs_ZtnjAOoDtAkhCmxlFEDQ25MNcju94graeWqlfRttb.jpg?size=50x50&quality=96&crop=8,12,974,974&ava=1'; 

  return (
    <header className="header">
      <div className="language" onClick={changeLanguage}>
        {userLanguage === 'ru' ? 'Ru' : 'En'} 
      </div>

      <div className="userinfo">
        <p className="username">{firstName}</p>
        <img 
          src={photoUrl} 
          className="userphoto" 
          alt="user_photo" 
        />
      </div>
    </header>
  );
};

export default Header;