import React from "react";
import film from '../../../images/film.svg';

const MoviesCard = () => {
  return (
/*     <li className="card">
    <div className="card__info">
      <h4 className="card__title">33 слова о дизайне</h4>
      <p className="card__duration"><span>1ч 47м</span> минут</p>
    </div>
    <img className="card__image" src={film} alt="обложка фильма" />
    <button textOnButton="" ClassName="card__button" ></button>
  </li> */
    <div className="card">
      <img className="card__image" alt="обложка фильма" src={film} />
      <div className="card__info">
        <h4 className="card__title">33 слова о дизайне</h4>
        <button className="card__like"></button>
      </div>
      <p className="card__duration">1ч 47м</p>
    </div>
  )
};

export default MoviesCard;