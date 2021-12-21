import React from 'react';
import { Link } from 'react-router-dom';
import accIcon from '../../images/acc.svg';
import Nav from '../Nav/Nav';
import NavigationMobile from '../NavigationMobile/NavigationMobile';

const Navigation = ({ type }) => {
  return(
    <>
      { type !== 'loggedIn' &&
        <ul className="navigation__links">
          <Link className="navigation__link" to="/signup">Регистрация</Link>
          <Link className="navigation__link" to="/signin">Войти</Link>
        </ul>
      }
      { type === 'loggedIn' &&
      <>
        <Nav />
        <NavigationMobile />
        <Link className="navigation__accaunt navigation__accaunt_loggedIn" to="/profile">
          <img className="navigation__icon" alt="вход в аккаунт" src={accIcon} />
          <p className="navigation__text">Аккаунт</p>
        </Link>
      </>
      }
    </>
  );
};

export default Navigation;