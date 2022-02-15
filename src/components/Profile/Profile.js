import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CuttentUserContext";
import useWithValidation from '../../utils/useValidation';

const Profile = ({ handleUpdateUser, signOut }) => {
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userEmail = currentUser.email;

  const { values, setValues, handleChange, errors, isValid } = useWithValidation();

  const isDisabled = values.email === '' || !isValid || values.name === '' || (values.email === userEmail && values.name === userName);
  const profileButton = !isDisabled ? '' : ' button-disabled';

  useEffect(() => {
    setValues({
      name: userName,
      email: userEmail,
    });
  }, [currentUser, setValues, userName, userEmail]);

  useEffect(() => {
    setIsUpdateUser(
      !(values.name === userName) || !(values.email === userEmail)
    );
  }, [values.name, values.email, userName, userEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({
        name: values.name,
        email: values.email,
      });
  }

  const handleSignOut = () => {
    signOut();
  };

  return (
    <form className="profile">
        <fieldset className="profile__content">
        <h2 className="profile__title">{`Привет, ${userName}!`}</h2>
        <span className="form__error">{errors.name}</span>
        <div className="profile__container">
          <p className="profile__name">Имя</p>
          <input className="profile__input" minLength={2} maxLenght={30} required type="text" name="name" placeholder="" value={values.name || ''} onChange={handleChange}></input>
        </div>
        <div className="profile__span">
        <div className="profile__container">
          <p className="profile__name">E-mail</p>
          <input className="profile__input" required type="email" name="email" placeholder="" value={values.email || ''} onChange={handleChange}></input>
        </div>
        <span className="form__error">{errors.email}</span>
        </div>
        <button className={`profile__button-edit ${ profileButton || !isValid ? `button-disabled` : "" }`} type="submit" onClick={handleSubmit}>Редактировать</button>
        <button className="profile__button-exit" type="button" onClick={handleSignOut}>Выйти из аккаунта</button>
      </fieldset>
    </form>
  )
};

export default Profile;