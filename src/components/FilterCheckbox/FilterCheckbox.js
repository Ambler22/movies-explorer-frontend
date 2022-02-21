import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

const FilterCheckbox = ({ onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if ((location.pathname === '/saved-movies') && (localStorage.getItem('savedCheckboxData') === 'true')) {
      setIsActive(true);
    } else if ((location.pathname === '/movies') && (localStorage.getItem('checkboxData') === 'true')) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location.pathname])

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <div className="checkbox">
      <label className="checkbox__name" htmlFor="checkbox">Короткометражки</label>
      <input type="checkbox" onChange={handleClick} id="checkbox" className="checkbox__image" />
    </div>
  )
};

export default FilterCheckbox;