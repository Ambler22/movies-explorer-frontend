import React, { useState, useEffect } from "react";
import SearchForm from "../SharchForm/SharchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';
import api from "../../../utils/MainApi";

const SavedMovies = ({ movies, setMovies, savedMovies, setSavedMovies, searchMovie, searchError, setSearchError, checkSavedCards, setCheckSavedCards}) => {
  const [isSearched, setIsSearched] = useState(false);
  const [inputValue, setInputValue] = useState('' || localStorage.getItem('savedSearchText'));
  
    useEffect(() => {
      api.getSavedMovies(localStorage.getItem('jwt'))
      .then((res) => {
        setSavedMovies(res)
      })
    }, []);

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

  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsSearched(true)
    setTimeout(() => setIsSearched(false), 1000);
    setTimeout(() => searchMovie(inputValue), 1001);
    setInputValue('');
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