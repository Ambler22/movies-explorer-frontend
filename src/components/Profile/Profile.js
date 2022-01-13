import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CuttentUserContext";
import useWithValidation from '../../utils/useValidation';

const Profile = ({ handleUpdateUser, signOut }) => {
/*   const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const currentUser = useContext(CurrentUserContext);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleUserEmailChange =(e) => setUserEmail(e.target.value);

  useEffect(() => {
    setUserName(currentUser.userName);
    setUserEmail(currentUser.userEmail);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateUser({
      name: userName,
      email: userEmail,
    });
  }; */

  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userEmail = currentUser.email;

  const { values, setValues, handleChange, errors, isValid } = useWithValidation();

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

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <div className="profile__container">
          <p className="profile__name">Имя</p>
          <input className="profile__input" minLength={2} maxLenght={30} required type="text" placeholder="" defaultValue={values.name || ''} onChange={handleChange} /* defaultValue={currentUser.name} onChange={handleUserNameChange} */></input>
        </div>
        <div className="profile__container">
          <p className="profile__name">E-mail</p>
          <input className="profile__input" required type="email" placeholder="" defaultValue={values.email || ''} onChange={handleChange} /* defaultValue={currentUser.email} onChange={handleUserEmailChange} */></input>
        </div>
        <button className="profile__button-edit" type="submit" onClick={handleSubmit}>Редактировать</button>
        <button className="profile__button-exit" type="button" onClick={handleSignOut}>Выйти из аккаунта</button>
      </fieldset>
    </form>
  )
};

export default Profile;