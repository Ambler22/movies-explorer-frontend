import React, { useState, useEffect } from "react";
import SearchForm from "./SharchForm/SharchForm";
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';

const Movies = (props) => {

  const [isLiked, setIsLiked] = useState(false);
/*   const [isLoading, setIsLoading] = useState(false); */

  const like = isLiked ? '-active' : '';

  const handleLikeClick = () => setIsLiked(!isLiked);
/*   const handleLoadClick = () => setIsLoading(!isLoading); */

  const [moviesCount, setMoviesCount] = React.useState(0);

  const windowWidth = document.documentElement.clientWidth;

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
        <SearchForm searchMovie={props.searchMovie} />
        <MoviesCardList
          onClick={handleLikeClick}
          className={like}
          movies={props.movies}

          moviesCount={moviesCount}/>
        <button className="movies__button" onClick={handleAddMovies}>Еще</button>
      </div>

    </section>
  )
};

export default Movies;