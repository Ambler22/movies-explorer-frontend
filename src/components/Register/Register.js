import React from "react";
import Logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

const Register = () => {
  return(
      <form className="form">
        <fieldset className="form__content">
        <Link to='/'>
          <img className="form__image" alt="логотип сайта" src={Logo} />
        </Link>
        <h2 className="form__title">Добро пожаловать!</h2>
        <div className="form__mobile">
          <p className="form__text">Имя</p>
          <input className="form__input" required id="name" name="name" type="text" placeholder="" defaultValue="Роман"></input>
        </div>
        <div className="form__mobile">
          <p className="form__text">E-mail</p>
          <input className="form__input" required id="email" name="email" type="email" placeholder="" defaultValue="roman@mail.ru"></input>
        </div>
        <div className="form__mobile">
          <p className="form__text">Пароль</p>
          <input className="form__input" required id="password" name="password" type="password" placeholder="" defaultValue="123123123"></input>
          <span className="form__error">Что-то пошло не так...</span>
        </div>
          <button className="form__button" type="submit">Зарегистрироваться</button>
        </fieldset>
        <p className="form__question">Уже зарегистрированы?<Link to='/signin' className="form__link">Войти</Link></p>
      </form>
  )
};

export default Register;