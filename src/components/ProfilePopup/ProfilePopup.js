import React from 'react';
import popupImage from '../../images/profile-popup.png';

const ProfilePopup = ({ onUpdate }) => {
  return(
    <div className={`popup ${onUpdate ? 'popup_is-opened' : ''}`}>
      <div className="popup__content">
        <img className="popup__icon" src={popupImage} alt="иконка модального окна" />
        <h3 className="popup__title">Ваши данные успешно обновлены.</h3>
      </div>
    </div>
  )
};

export default ProfilePopup;