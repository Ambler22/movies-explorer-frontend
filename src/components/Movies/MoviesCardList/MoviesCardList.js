import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";


const MoviesCardList = ({ movies, savedMovies, setSavedMovies, onClick, className, moviesCount, handleSaveMovies, checkbox, onDelete, setIsLiked, isLiked}) => {
  const filteredMoviesByDuration = movies.filter((movie) => {
    if ((movie.duration <= 40 && checkbox) || !checkbox) {
      return movie;
    }
  });

  return (
    <ul className="cards">
      {(filteredMoviesByDuration.slice(0, moviesCount).map((movie) =>
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