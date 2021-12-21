import React from "react";

const Profile = () => {
  return (
    <form className="profile">
        <fieldset className="profile__content">
        <h2 className="profile__title">Привет, Роман!</h2>
        <div className="profile__container">
          <p className="profile__name">Имя</p>
          <input className="profile__input" required type="text" placeholder="" defaultValue="Роман"></input>
        </div>
        <div className="profile__container">
          <p className="profile__name">E-mail</p>
          <input className="profile__input" required type="email" placeholder="" defaultValue="roman@mail.ru"></input>
        </div>
        <button className="profile__button-edit" type="submit">Редактировать</button>
        <button className="profile__button-exit" type="button">Выйти из аккаунта</button>
      </fieldset>
    </form>
  )
};

export default Profile;