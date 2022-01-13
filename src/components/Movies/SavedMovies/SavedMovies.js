import React, { useState } from "react";
import SearchForm from "../SharchForm/SharchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

//
import api from "../../../utils/MainApi";
//

const SavedMovies = (props) => {
  const [isDelite, setIsDelite] = useState(false);

  const handleDeleteClick = () => {
    setIsDelite(!isDelite);
  }

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList className="-delete" onClick={handleDeleteClick} movies={props.movies}/>
    </section>
  )
};

export default SavedMovies;