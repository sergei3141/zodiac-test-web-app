import React from 'react';

const tg = window.Telegram.WebApp;

const Header = ({ userLanguage, changeLanguage }) => {
  return (
    <header className="header">
      <div onClick={changeLanguage} className="language">
        {userLanguage === 'ru' ? <div>Ru</div> : <div>En</div>}
      </div>
      <div className="userinfo">
        <p className="username">
          {tg?.initDataUnsafe?.user?.first_name || 'Name'}
        </p>
        <img
          src={
            tg?.initDataUnsafe?.user?.photo_url ||
            'https://sun1-96.userapi.com/s/v1/ig2/H3p4pdUAc0vEmbkVPrJV9-5q_jx0I8Glhyl7L7shix1JFs_ZtnjAOoDtAkhCmxlFEDQ25MNcju94graeWqlfRttb.jpg?size=50x50&quality=96&crop=8,12,974,974&ava=1'
          }
          className="userphoto"
          alt="user_photo"
        />
      </div>
    </header>
  );
};

export default Header;