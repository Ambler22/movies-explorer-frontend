import React from "react";
import SearchForm from "../SharchForm/SharchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList className="-delete" />
    </section>
  )
};

export default SavedMovies;