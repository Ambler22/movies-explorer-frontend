import React, { useState } from "react";
import Logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import useWithValidation from '../../utils/useValidation';

const Login = ({ handleAuthorization }) => {
    const { values, handleChange, errors, isValid } = useWithValidation();

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAuthorization(values.email, values.password);
    }

  return(
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form__content">
        <Link to='/'>
          <img className="form__image" alt="логотип сайта" src={Logo} />
        </Link>
        <h2 className="form__title">Рады видеть!</h2>
        <div className="form__mobile">
          <p className="form__text">E-mail</p>
          <input className="form__input" required id="email" name="email" type="email" placeholder="" value={values.email || ''} onChange={handleChange}></input>
          <span className="form__error">{errors.email}</span>
        </div>
        <div className="form__mobile">  
          <p className="form__text">Пароль</p>
          <input className="form__input" required id="password" name="password" type="password" placeholder="" value={values.password || ''} onChange={handleChange}></input>
          <span className="form__error">{errors.password}</span>
        </div>
          <button className={`form__button form__login ${ !isValid ? `button-disabled` : "" }`} type="submit">Войти</button>
        </fieldset>
        <p className="form__question">Ещё не зарегистрированы?<Link to='/signup' className="form__link">Регистрация</Link></p>
      </form>
  )
};

export default Login;