import React, { useState, useEffect } from "react";
import SearchForm from "./SharchForm/SharchForm";
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';

const Movies = ({
    movies, setMovies, searchMovie, savedMovies, setSavedMovies, handleSaveMovies, searchError, setSearchError,
    checkbox, setCheckbox,
  }) => {

  const [isSearched, setIsSearched] = useState(false);
  const [inputValue, setInputValue] = useState('' || localStorage.getItem('searchText'));

   useEffect(() => {
    const searchResult = localStorage.getItem('search');
    if (searchResult && searchResult !== 'undefined' && JSON.parse(searchResult).length > 0) {
        setMovies(JSON.parse(searchResult));
    }
}, [setMovies]);

 useEffect(() => {
   if (localStorage.getItem('saved')) {
     setSavedMovies(JSON.parse(localStorage.getItem('saved')));
   }
 }, [setSavedMovies])

  useEffect(() => {
    setSearchError(false);
  }, []);

  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsSearched(true)
    setTimeout(() => setIsSearched(false), 1000);
    setTimeout(() => searchMovie(inputValue), 1001);
    localStorage.setItem('searchText', inputValue);
    console.log(inputValue);
  }

  useEffect(() => {
    setCheckbox(JSON.parse(localStorage.getItem('checkboxData')));
  }, [setCheckbox]);

  return (
    <section className="movies">
      <div className="movies__content">
        <SearchForm
          searchMovie={searchMovie}
          setIsSearched={setIsSearched}

          checkbox={checkbox}
          setCheckbox={setCheckbox}
          onChange={handleSearch}
          onSubmit={handleSubmit}/>

          <h2 className={searchError ? 'movies__search-error' : 'movies__search-error movies__search-error-hidden'}>
            Ничего не найдено!
          </h2>

          { isSearched ? <Preloader/> : (movies ?
          <MoviesCardList
            movies={movies}
            setMovies={setMovies}

            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            handleSaveMovies={handleSaveMovies}

            checkbox={checkbox}
            setCheckbox={setCheckbox} /> : null)}
      </div>

    </section>
  )
};

export default Movies;