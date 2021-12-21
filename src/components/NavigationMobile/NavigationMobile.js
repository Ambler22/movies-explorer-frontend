import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import NavLinks from '../NavLinks/NavLinks';
import burgerIcon from '../../images/burger-menu.svg';
import closeBurgerIcon from '../../images/burger-close.svg';
import accauntIcon from '../../images/acc.svg';

const NavigationMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const wrightIcon = !isOpen ? burgerIcon : closeBurgerIcon;
  const classes = `${isOpen ? 'navigation__pages_view_mobile navigation__pages_view_mobile-active' : 'navigation__pages_view_mobile'}`;

  const handleBurgerClick = () => setIsOpen(!isOpen);
  const closeBurgerMenu = () => setIsOpen(false);

  return (
    <ul className={classes}>
      <img className="navigation__burger" src={wrightIcon} alt="меню" onClick={handleBurgerClick} />
      { isOpen &&
      <>
        <NavLinks view="view_mobile" isMobile={true} closeBurgerMenu={closeBurgerMenu}  />
        <NavLink className="navigation__accaunt_view_mobile" to="/profile" onClick={closeBurgerMenu} >
          <img className="navigation__icon" alt="аккаунт" src={accauntIcon} />
          <p className="navigation__text">Аккаунт</p>
        </NavLink>
      </>
      }
    </ul>
  )
};

export default NavigationMobile;