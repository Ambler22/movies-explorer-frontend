import React from "react";
import SearchForm from "./SharchForm/SharchForm";
import MoviesCardList from './MoviesCardList/MoviesCardList';

const Movies = () => {
  return (
    <section className="movies">
      <div className="movies__content">
        <SearchForm />
        <MoviesCardList />
        <button className="movies__button">Еще</button>
      </div>

    </section>
  )
};

export default Movies;