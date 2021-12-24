import React from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <form className="sharch-form">
      <fieldset className="sharch-form__content">
        <div className="sharch-form__box">
          <input className="sharch-form__input" type="search" placeholder="Фильм" id="film" required="false"></input>
          <button className="sharch-form__button"></button>
        </div>
        <FilterCheckbox />
      </fieldset>
    </form>
  )
};

export default SearchForm;