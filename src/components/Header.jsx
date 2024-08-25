import React, { useState, useEffect } from 'react';

const tg = window.Telegram.WebApp;

const Header = ({ userLanguage, changeLanguage }) => {
  const userData = tg?.initDataUnsafe?.user;
  const userId = userData?.id;
  const firstName = userData?.first_name || 'Name';
  const [photoUrl, setPhotoUrl] = useState('https://sun1-96.userapi.com/s/v1/ig2/H3p4pdUAc0vEmbkVPrJV9-5q_jx0I8Glhyl7L7shix1JFs_ZtnjAOoDtAkhCmxlFEDQ25MNcju94graeWqlfRttb.jpg?size=50x50&quality=96&crop=8,12,974,974&ava=1');
  
  useEffect(() => {
    const fetchPhotoUrl = async () => {
      try {
        if (userId) {
          // Отправляем userId боту и ждём ответа
          const result = await tg.sendMessage(userId); 

          // Получаем URL фото из ответа бота
          const urlParams = new URLSearchParams(new URL(result.web_app_data.url).search);
          const photoUrlFromBot = urlParams.get('photoUrl');

          // Обновляем состояние, если URL получен
          if (photoUrlFromBot) {
            setPhotoUrl(photoUrlFromBot);
          }
        }
      } catch (error) {
        console.error("Ошибка при получении фото:", error);
      }
    };

    fetchPhotoUrl(); // Вызываем асинхронную функцию 
  }, []); // Выполняем useEffect только один раз 

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