import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router";


const MoviesCardList = ({ movies, savedMovies, setSavedMovies, onClick, className, /* moviesCount, */ handleSaveMovies, checkbox, checkSavedCards}) => {
  const location = useLocation();

  const [moviesCount, setMoviesCount] = useState(0);
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

  const filteredByDuration = movies.filter((card) => {
    if (location.pathname === '/movies') {
      return ((card.duration <= 40 && checkbox) || !checkbox) ? card : null;
    }
    if (location.pathname === '/saved-movies') {
      return ((card.duration <= 40 && checkSavedCards) || !checkSavedCards) ? card : null;
    }
  });

  return (
    <>
    <ul className="cards">
      {(filteredByDuration.slice(0, moviesCount).map((movie) =>
          <MoviesCard
            movie={movie}
            key={movie.id || movie._id}

            duration={movie.duration}
            onClick={onClick}
            handleSaveMovies={handleSaveMovies}
            buttonName={className}
            
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
          />
      ))}
    </ul>
    { (moviesCount >= filteredByDuration.length) ? null :
      <button className="movies__button" onClick={handleAddMovies}>Еще</button>
    }
    </>
  )
};

export default MoviesCardList;