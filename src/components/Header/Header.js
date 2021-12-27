import React from 'react';
import HeaderLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({ type }) => {
  return(
    <header className={`header header_${type}`}>
      <div className={`header__content header__content_${type}`}>
        <Link className="header__page" to='/'>
          <img className="header__logo" alt="логотип сайта" src={HeaderLogo} />
        </Link>
        { type !== 'loggedIn' && <Navigation /> }
        { type === 'loggedIn' && <Navigation type='loggedIn' /> }
      </div>
    </header>
  )
};

export default Header;