import React from "react";
import SearchForm from "../SharchForm/SharchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import MoviesCard from "../MoviesCard/MoviesCard";

const SavedMovies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
    </section>
  )
};

export default SavedMovies;