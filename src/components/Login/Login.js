import React from "react";
import Logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

const Login = () => {
  return(
      <form className="form">
        <fieldset className="form__content">
        <Link to='/'>
          <img className="form__image" alt="логотип сайта" src={Logo} />
        </Link>
        <h2 className="form__title">Рады видеть!</h2>
        <div className="form__mobile">
          <p className="form__text">E-mail</p>
          <input className="form__input" required id="email" name="email" type="email" placeholder="" defaultValue="roman@mail.ru"></input>
        </div>
        <div className="form__mobile">  
          <p className="form__text">Пароль</p>
          <input className="form__input" required id="password" name="password" type="password" placeholder="" defaultValue=""></input>
        </div>
          <button className="form__button form__login" type="submit">Войти</button>
        </fieldset>
        <p className="form__question">Ещё не зарегистрированы?<Link to='/signup' className="form__link">Регистрация</Link></p>
      </form>
  )
};

export default Login;