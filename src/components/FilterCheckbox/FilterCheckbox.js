import React from "react";

const FilterCheckbox = ({ onClick }) => {

  return (
    <div className="checkbox">
      <label className="checkbox__name" htmlFor="checkbox">Короткометражки</label>
      <input type="checkbox" onChange={onClick} id="checkbox" className="checkbox__image" />
    </div>
  )
};

export default FilterCheckbox;