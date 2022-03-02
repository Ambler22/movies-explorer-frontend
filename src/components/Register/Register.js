import React from "react";
import Logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import useWithValidation from '../../utils/useValidation';

const Register = ({ handleRegistration }) => {
  const { values, handleChange, errors, isValid } = useWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values.email, values.password, values.name);
  };

  return(
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form__content">
        <Link to='/'>
          <img className="form__image" alt="логотип сайта" src={Logo} />
        </Link>
        <h2 className="form__title">Добро пожаловать!</h2>
        <div className="form__mobile">
          <p className="form__text">Имя</p>
          <input className="form__input" minLength={2} maxLength={30} required type="text" name="name" id="name" placeholder="" value={values.name || ''} onChange={handleChange}></input>
          <span className="form__error">{errors.name}</span>
        </div>
        <div className="form__mobile">
          <p className="form__text">E-mail</p>
          <input className="form__input" required id="email" name="email" type="email" placeholder="" value={values.email || ''} onChange={handleChange}></input>
          <span className="form__error">{errors.email}</span>
        </div>
        <div className="form__mobile">
          <p className="form__text">Пароль</p>
          <input className="form__input" minLength={6} required id="password" name="password" type="password" placeholder="" value={values.password || ''} onChange={handleChange}></input>
          <span className="form__error">{errors.password}</span>
        </div>
          <button className={`form__button ${ !isValid ? `button-disabled` : "" }`} type="submit">Зарегистрироваться</button>
        </fieldset>
        <p className="form__question">Уже зарегистрированы?<Link to='/signin' className="form__link">Войти</Link></p>
      </form>
  )
};

export default Register;