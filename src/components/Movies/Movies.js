import React, { useState } from "react";
import SearchForm from "./SharchForm/SharchForm";
import MoviesCardList from './MoviesCardList/MoviesCardList';

const Movies = () => {

  const [isLiked, setIsLiked] = useState(false);

  const like = isLiked ? '-active' : '';

  const handleLikeClick = () => setIsLiked(!isLiked);
  
  return (
    <section className="movies">
      <div className="movies__content">
        <SearchForm />
        <MoviesCardList onClick={handleLikeClick} className={like} />
        <button className="movies__button">Еще</button>
      </div>

    </section>
  )
};

export default Movies;