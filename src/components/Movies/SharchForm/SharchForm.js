import React, {useState} from "react";
import { useSearchParams } from "react-router-dom";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

const SearchForm = ({ onSubmit, onChange, searchMovie }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = (evt) => {
    setInputValue(evt.target.value);
}

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchMovie(inputValue);
    setInputValue('');
  }

  return (
    <form className="sharch-form">
      <fieldset className="sharch-form__content">
        <div className="sharch-form__box">
          <input className="sharch-form__input" type="search" placeholder="Фильм" id="film" required="false" /* onChange={onChange} */
          onChange={handleChangeInput}></input>
          <button className="sharch-form__button" onClick={handleSubmit}></button>
        </div>
        <FilterCheckbox />
      </fieldset>
    </form>
  )
};

export default SearchForm;