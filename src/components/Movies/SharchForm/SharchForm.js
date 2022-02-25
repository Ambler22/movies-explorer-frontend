import React from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";
import { useLocation } from 'react-router-dom';

const SearchForm = ({ searchMovie, setIsSearched, checkSavedCards, setCheckSavedCards, checkbox, setCheckbox, onChange, onSubmit }) => {
  const location = useLocation();

  const handleCheckbox = () => {
    if (location.pathname === '/movies') {
      setCheckbox(!checkbox);
      localStorage.setItem('checkboxData', JSON.stringify(!checkbox));
    }
    if (location.pathname === '/saved-movies') {
      setCheckSavedCards(!checkSavedCards);
      localStorage.setItem('savedCheckboxData', JSON.stringify(!checkSavedCards));
    }
  };

  const setSearchValue = () => {
    return location.pathname === '/movies' ? localStorage.getItem('searchText') : localStorage.getItem('savedSearchText');
  };

  return (
    <form className="sharch-form">
      <fieldset className="sharch-form__content">
        <div className="sharch-form__box">
          <input className="sharch-form__input" type="search" placeholder="Фильм" id="film" required="false"
            onChange={onChange} defaultValue = {setSearchValue() || ''} ></input>
          <button className="sharch-form__button" onClick={onSubmit}></button>
        </div>
        <FilterCheckbox onClick={handleCheckbox} defaultChecked={checkbox} checkSavedCards={checkSavedCards} setCheckSavedCards={setCheckSavedCards}/>
      </fieldset>
    </form>
  )
};

export default SearchForm;