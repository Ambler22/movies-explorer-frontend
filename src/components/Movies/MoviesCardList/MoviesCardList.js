import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";


const MoviesCardList = ({ movies, savedMovies, setSavedMovies, onClick, className, moviesCount, handleSaveMovies, onDelete, setIsLiked, isLiked}) => {
/*   const setMovies = (cardsAfterSearch) => {
    return cardsAfterSearch = window.innerWidth > 768 ? 12
      : window.innerWidth > 480 ? 8 : 5;
  };

  const [visible, setIsVisible] = useState(setMovies()) */

  return (
    <ul className="cards">
      {(movies.slice(0, moviesCount).map((movie) =>
          <MoviesCard
            movie={movie}
            key={movie.id || movie._id}
            duration={movie.duration}
            onClick={onClick}
            handleSaveMovies={handleSaveMovies}
            /* onDelete={onDelete} */
            buttonName={className}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}

/*             setIsLiked={setIsLiked}
            isLiked={isLiked} */
          />
      ))}
    </ul>
/*    <ul className="cards">
      <MoviesCard buttonName={className} handleClick={onClick} />
    </ul> */
  )
};

export default MoviesCardList;