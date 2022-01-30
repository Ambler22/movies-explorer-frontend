import React from 'react';
import { useLocation } from 'react-router-dom';
import popupImage from '../../images/image_for_popup.png';

const PopupError = ({ onClose, isOpen }) => {
  const location = useLocation();

  const error = (popupText) => {
    if (location.pathname === '/profile') {
      return popupText = 'При обновлении профиля произошла ошибка.';
    } else if (location.pathname === '/signin') {
      return popupText = 'Вы ввели неправильный логин или пароль.';
    } else if (location.pathname === '/signup') {
      return popupText = 'Пользователь с таким email уже существует.';
    } else if (location.pathname === '/movies') {
      return popupText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    } else if (location.pathname === '/saved-movies') {
      return popupText = 'Ошибка на сервере.';
    }
  };

  return(
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__icon" src={popupImage} alt="иконка модального окна" />
        <h3 className="popup__title">{error()}</h3>
      </div>
    </div>
  )
};

export default PopupError;