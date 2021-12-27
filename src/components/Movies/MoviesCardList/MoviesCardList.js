import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ onClick, className }) => {
  return (
    <ul className="cards">
      <MoviesCard buttonName={className} handleClick={onClick} />
      <MoviesCard buttonName={className} handleClick={onClick} />
      <MoviesCard buttonName={className} handleClick={onClick} />
      <MoviesCard buttonName={className} handleClick={onClick} />
      <MoviesCard buttonName={className} handleClick={onClick} />
{/*       <MoviesCard />
      <MoviesCard />
      <MoviesCard /> */}
{/*       <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard /> */}
    </ul>
  )
};

export default MoviesCardList;