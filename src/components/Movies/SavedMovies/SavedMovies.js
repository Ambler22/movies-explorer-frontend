import React, { useState, useEffect } from "react";
import SearchForm from "../SharchForm/SharchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ movies, setMovies, savedMovies, setSavedMovies, searchMovie, searchError, setSearchError, checkSavedCards, setCheckSavedCards}) => {
  const [isSearched, setIsSearched] = useState(false);
  const [inputValue, setInputValue] = useState('' || localStorage.getItem('savedSearchText'));

    useEffect(() => {
      setSearchError(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('savedCheckboxData') === 'true') {
      setCheckSavedCards(true);
    } else {
      setCheckSavedCards(false); 
    }
  }, [setCheckSavedCards]);

  useEffect(() => {
    if (localStorage.getItem('saved')) {
      setSavedMovies(JSON.parse(localStorage.getItem('saved')));
      console.log('тест')
    }
  }, [setSavedMovies]);

  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsSearched(true)
    setTimeout(() => setIsSearched(false), 1000);
    setTimeout(() => searchMovie(inputValue), 1001);
    localStorage.setItem('savedSearchText', inputValue);
  }

  return (
    <section className="movies">
      <SearchForm searchMovie={searchMovie}
        setIsSearched={setIsSearched}
        checkSavedCards={checkSavedCards}
        setCheckSavedCards={setCheckSavedCards}
        onChange={handleSearch}
        onSubmit={handleSubmit}/>
        <h2 className={searchError ? 'movies__search-error' : 'movies__search-error movies__search-error-hidden'}>
          Ничего не найдено!
        </h2>
      { isSearched ? <Preloader /> : 
        <MoviesCardList
          className="-delete"
          movies={movies}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          checkSavedCards={checkSavedCards}
          setCheckSavedCards={setCheckSavedCards} /> }
    </section>
  )
};

export default SavedMovies;