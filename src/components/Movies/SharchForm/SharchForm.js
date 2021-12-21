import React from "react";
// import FindIcon from '../../../images/find.svg';
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <form className="sharch-form">
      <fieldset className="sharch-form__content">
        {/* <img src={FindIcon} alt="найти" className="sharch-form__icon"/> */}
        <div className="sharch-form__box">
          <input className="sharch-form__input" type="search" placeholder="Фильм" id="film"></input>
          <button className="sharch-form__button"></button>
        </div>
        <FilterCheckbox />
      </fieldset>
    </form>
  )
};

export default SearchForm;