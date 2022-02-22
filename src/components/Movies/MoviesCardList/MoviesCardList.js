import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router";


const MoviesCardList = ({ movies, savedMovies, setSavedMovies, onClick, className, moviesCount, handleSaveMovies, checkbox, checkSavedCards}) => {
  const location = useLocation();

  const filteredByDuration = movies.filter((card) => {
    if (location.pathname === '/movies') {
      return ((card.duration <= 40 && checkbox) || !checkbox) ? card : null;
    }
    if (location.pathname === '/saved-movies') {
      return ((card.duration <= 40 && checkSavedCards) || !checkSavedCards) ? card : null;
    }
  });

  return (
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
  )
};

export default MoviesCardList;