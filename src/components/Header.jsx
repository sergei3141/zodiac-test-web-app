import React, { useState, useEffect } from 'react';

const tg = window.Telegram.WebApp;

const Header = ({ userLanguage, changeLanguage }) => {
  const userData = tg?.initDataUnsafe?.user;
  const firstName = userData?.first_name || 'Name';
  const [photoUrl, setPhotoUrl] = useState('https://sun1-96.userapi.com/s/v1/ig2/H3p4pdUAc0vEmbkVPrJV9-5q_jx0I8Glhyl7L7shix1JFs_ZtnjAOoDtAkhCmxlFEDQ25MNcju94graeWqlfRttb.jpg?size=50x50&quality=96&crop=8,12,974,974&ava=1');

  //Получение фото пользователя
  useEffect(() => {
    const fetchUserProfilePhotos = async () => {
      try {
        const result = await tg.getUserProfilePhotos();
        if (result.photos.length > 0) {
          // Выбираем фото нужного размера 
          const photo = result.photos[0][0];
          const fileId = photo.file_id;
          
          // Получаем URL фотографии 
          const fileUrl = await tg.getFileUrl(fileId);
          setPhotoUrl(fileUrl);
        }
      } catch (error) {
        console.error('Ошибка при получении фото профиля:', error);
      }
    };

    if (userData) {
      fetchUserProfilePhotos();
    }
  }, [userData]);

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