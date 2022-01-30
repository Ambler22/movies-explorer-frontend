import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "./SharchForm/SharchForm";
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { CurrentUserContext } from "../../context/CuttentUserContext";
import Preloader from '../Movies/Preloader/Preloader';

const Movies = ({movies, setMovies, searchMovie, savedMovies, setSavedMovies, handleSaveMovies, searchError, setSearchError}) => {
  const [preloader, setPreloader] = React.useState(false);
/*   const currentUser = useContext(CurrentUserContext);
  const [search, setSearch] = useState('');
  const [isSearched, setIsSearched] = useState(true);
  const [isFound, setIsFound] = useState(false);
  const [result, setResult] = useState(savedMovies || []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    setIsSearched(false);
    e.preventDefault();
    handleSearchMovie(search);
    /* setIsSearched(true) */
/*     setTimeout(() => setIsSearched(true), 1000);
  }; */

/*   useEffect(() => { // проверить,
    setResult(savedMovies);
  }, [savedMovies]); */

/*   useEffect(() => {
    const searchResult = localStorage.getItem('search');
    if (searchResult && searchResult !== 'undefined' && JSON.parse(searchResult).length > 0) {
        setMovies(JSON.parse(searchResult));
    }
}, [setMovies]); */

// кнопка еще
  const [moviesCount, setMoviesCount] = React.useState(0);
  const windowWidth = document.documentElement.clientWidth;
  const location = useLocation();

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
  
  return (
    <section className="movies">
      <div className="movies__content">
        <SearchForm /* searchMovie={props.searchMovie} onChange={handleSearch} handleSearchCard={props.handleSearchMovies} onSubmit={handleSubmit} */
        searchMovie={searchMovie}/>
        {preloader && (<Preloader/>)}

        <h2 className={searchError ? 'movies__search-error' : 'movies__search-error movies__search-error-hidden'}>
          Ничего не найдено!
        </h2>
        {movies ?
        <MoviesCardList
          movies={movies}
          setMovies={setMovies}
          moviesCount={moviesCount}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          /*onClick={handleLikeClick}
          className={like} */
          handleSaveMovies={handleSaveMovies} /> : null}
          { (moviesCount >= movies.length) ? null :
         <button className="movies__button" onClick={handleAddMovies}>Еще</button>
          }
      </div>

    </section>
  )
};

export default Movies;