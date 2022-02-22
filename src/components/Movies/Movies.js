import React, { useState, useEffect } from "react";
import SearchForm from "./SharchForm/SharchForm";
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';

const Movies = ({
    movies, setMovies, searchMovie, savedMovies, setSavedMovies, handleSaveMovies, searchError, setSearchError,
    checkbox, setCheckbox
  }) => {

  const [moviesCount, setMoviesCount] = useState(0);
  const [isSearched, setIsSearched] = useState(false);
  const windowWidth = document.documentElement.clientWidth;
  const [inputValue, setInputValue] = useState('' || localStorage.getItem('searchText'));

  function renderMovies() {
      if (windowWidth >= 1000) {
          return setMoviesCount(12);
      }
      if (windowWidth >= 768) {
          return setMoviesCount(8);
      } else {
          setMoviesCount(5);
      }
      return setMoviesCount(5);
  }

  const resizeMovies = (evt) => {
      if (evt.target.innerWidth >= 768) {
          setMoviesCount(12);
      } else if (evt.target.innerWidth >= 568) {
          setMoviesCount(8);
      } else {
          setMoviesCount(5);
      }
  }

  const handleAddMovies = () => {
      if (windowWidth < 480) {
          setMoviesCount((moviesCount) + 1);
      } else if (windowWidth < 768) {
          setMoviesCount((moviesCount) + 2);
      } else if (windowWidth > 767) {
          setMoviesCount((moviesCount) + 3);
      }
  }

  useEffect(() => {
    renderMovies();
    window.addEventListener('resize', (evt) => resizeMovies(evt));
    return () => {
        window.removeEventListener('resize', resizeMovies);
    }
  }, []);

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
    setInputValue('');
    localStorage.setItem('searchText', inputValue);
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

            moviesCount={moviesCount}

            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            handleSaveMovies={handleSaveMovies}

            checkbox={checkbox}
            setCheckbox={setCheckbox} /> : null)}
            { (moviesCount >= movies.length) ? null :
              <button className="movies__button" onClick={handleAddMovies}>Еще</button>
            }
      </div>

    </section>
  )
};

export default Movies;