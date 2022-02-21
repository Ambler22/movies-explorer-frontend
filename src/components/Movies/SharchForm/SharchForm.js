import React, {useState} from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";
import { useLocation } from 'react-router-dom';

const SearchForm = ({ searchMovie, setIsSearched, checkSavedCards, setCheckSavedCards, checkbox, setCheckbox, onChange, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();

/*   const handleCheckbox = () => {
    localStorage.setItem("checkboxData", JSON.stringify(!checkbox));
    setCheckbox(!checkbox);
  }; */

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

   const handleChangeInput = (evt) => {
    setInputValue(evt.target.value);
    console.log(evt.target.value);
}

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsSearched(true)
    setTimeout(() => setIsSearched(false), 1000);
    setTimeout(() => searchMovie(inputValue), 1001);
    setInputValue('');
  }

  return (
    <form className="sharch-form">
      <fieldset className="sharch-form__content">
        <div className="sharch-form__box">
          <input className="sharch-form__input" type="search" placeholder="Фильм" id="film" required="false"
            onChange={handleChangeInput} defaultValue = {/* setSearchValue() || */ ''} ></input>
          <button className="sharch-form__button" onClick={handleSubmit}></button>
        </div>
        <FilterCheckbox onClick={handleCheckbox} defaultChecked={checkbox} checkSavedCards={checkSavedCards} setCheckSavedCards={setCheckSavedCards}/>
      </fieldset>
    </form>
  )
};

export default SearchForm;