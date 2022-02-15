import React, { useState, useEffect } from "react";
import SearchForm from "../SharchForm/SharchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';
import api from "../../../utils/MainApi";

const SavedMovies = ({ movies, savedMovies, setSavedMovies, searchMovie, searchError, setSearchError, checkbox, setCheckbox}) => {
  const [isSearched, setIsSearched] = useState(false);
  
    useEffect(() => {
      api.getSavedMovies(localStorage.getItem('jwt'))
      .then((res) => {
        setSavedMovies(res)
      })
    }, []);

    useEffect(() => {
      setSearchError(false);
  }, []);

  return (
    <section className="movies">
      <SearchForm searchMovie={searchMovie} setIsSearched={setIsSearched} checkbox={checkbox} setCheckbox={setCheckbox}/>
        <h2 className={searchError ? 'movies__search-error' : 'movies__search-error movies__search-error-hidden'}>
          Ничего не найдено!
        </h2>
      { isSearched ? <Preloader /> : 
        <MoviesCardList
          className="-delete"
          movies={movies}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          checkbox={checkbox}
          setCheckbox={setCheckbox} /> }
    </section>
  )
};

export default SavedMovies;