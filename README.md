# Mini App Telegram
Приложение уже работает и доступно по ссылке https://t.me/zodiacSigntTestBot. 
Инструкция ниже приведена только для развёртывания нового независимого бота.
Если хотите запустить проект локально, сразу переходите к разделу "Дополнительно"

## Установка

Приложение состоит из двух частей - бота, размещённого на сервере и mini app, которое может быть размещено в том числе на статическом сервере.\

## Размещение mini app Telegram на статическом сервере

Для запуска mini app вам также потребуется загрузить его на сервер (достаточно стиатического). Клонируйте данный проект в собственный репозиторий GitHub.\
В данном примере мы будем использовать Netlify в качестве сервера. Пройдите регистрацию, свяжите собственный репозиторий \
с Netlify и подтягите проект с вашего репозитория GitHub. Дождитесь, пока проект будет собран и размещён по ссылке. \
Полученную ссылку сохраните

## Размещение mini app Telegram на сервере

Для корректной работы mini app Telegram требуется настройка бота Телеграм. Бота можно скачать по ссылке: https://github.com/sergei3141/Zodiac_telegram_bot
Откройте телеграм и найдите бота BotFather. Задайте команду /newbot и следуйте инструкциям. \
После успешной регистрации бота получите токен и вставьте в созданный вами .env файл TELEGRAM_BOT_TOKEN и ранее сохранённую WEB_APP_URL\
Разверните данного бота на сервере и запустите. Не забудьте переменные окружения, созданные пунктом выше!

## Запуск:

Найдите созданного вами бота.\
Бот перенаправит вас в рабочее приожение Zodiac mini app Telegram

## Дополнительно:

Вы также можете запустить проект в браузере, клонировав его локально и выполнив команду `npm i`, а затем `npn start`,\
однако в таком случае некоторые функции, предоставляемые Telegram\
работать не будут (BackButton, CloseApp), а также определение имени и языка пользователя



