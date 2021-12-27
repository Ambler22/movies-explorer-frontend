import React from "react";
import film from '../../../images/film.svg';
// import CardButton from "../../CardButton/CardButton";

const MoviesCard = ({ buttonName, handleClick }) => {
  return (
    <div className="card">
      <img className="card__image" alt="обложка фильма" src={film} />
      <div className="card__info">
        <h4 className="card__title">33 слова о дизайне</h4>
        {/* <CardButton buttonName={buttonName} /> */}
        <button className={`card__button card__button${buttonName}`} onClick={handleClick}></button>
      </div>
      <p className="card__duration">1ч 47м</p>
    </div>
  )
};

export default MoviesCard;