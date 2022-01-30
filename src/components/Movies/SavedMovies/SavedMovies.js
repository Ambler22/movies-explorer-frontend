import React, { useState, useContext, useEffect } from "react";
import SearchForm from "../SharchForm/SharchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../../context/CuttentUserContext";

//
import api from "../../../utils/MainApi";
//

const SavedMovies = ({ movies, savedMovies, setSavedMovies, onDelete, searchMovie, handleSearchMovie, searchError, setSearchError }) => {
  /* const [search, setIsSearch] = useState(''); */

/*   const handleMovieDelete = (movie) => {
    onDelete(movie);
  }; */

  /*  const handleSearch = (e) => {
      setIsSearch(e.target.value);
    }
  
    const handleSubmit= (e) => {
      e.preventDefault();
      handleSearchMovie(search);
    } */

    useEffect(() => {
      api.getSavedMovies(localStorage.getItem('jwt'))
      .then((res) => {
        setSavedMovies(res)
      })
    }, []);

  return (
    <section className="movies">
      <SearchForm searchMovie={searchMovie} /* onChange={handleSearch} */ /*handleSearchMovie={handleSearchMovie} onSubmit={handleSubmit} */ />
      <h2 className={searchError ? 'movies__search-error' : 'movies__search-error movies__search-error-hidden'}>
                    Ничего не найдено!
                </h2>
      <MoviesCardList className="-delete" /* onDelete={handleMovieDelete} */ movies={movies} savedMovies={savedMovies} setSavedMovies={setSavedMovies} />
    </section>
  )
};

export default SavedMovies;