import React from "react";
import { useSearchParams } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ movies, onClick, className, moviesCount, setIsLiked, isLiked, setSavedMovies, savedMovies}) => {

  return (
    <ul className="cards">
      {(movies.slice(0, moviesCount).map((movie) =>
          <MoviesCard
            setIsLiked={setIsLiked}
            isLiked={isLiked}
            key={movie.id}
            movie={movie}
            duration="27"
            onClick={onClick}
            buttonName={className}
          />
      ))}
    </ul>
/*    <ul className="cards">
      <MoviesCard buttonName={className} handleClick={onClick} />
    </ul> */
  )
};

export default MoviesCardList;