import React, {useEffect, useState} from "react";
import film from '../../../images/film.svg';
import moviesApi from "../../../utils/MoviesApi";
// import CardButton from "../../CardButton/CardButton";
import api from "../../../utils/MainApi";

const MoviesCard = ({ movie, setMovies, savedMovies, setSavedMovies, isLiked, setIsLiked, buttonName, handleClick, onClick, movies }) => {

  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins/60);
	  let minutes = mins % 60;
	  if (!minutes) {
      return hours + ' ч';
    } else if (hours) {
      return hours + 'ч ' + minutes + 'м';
    } else {
      return minutes + ' минут';
    }
  };

  return (
    <div className="card">
      {/* <img className="card__image" alt="обложка фильма" src={film} /> */}
      <a className="card__link" href={movie.trailerLink} rel="noreferrer" target="_blank"><img className="card__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} /></a>
      <div className="card__info">
        <h4 className="card__title">{movie.nameRU}</h4>
        <button className={`card__button card__button${buttonName}`} onClick={onClick}></button>
      </div>
      <p className="card__duration">{getTimeFromMins(movie.duration)}</p>
    </div>
  )
};

export default MoviesCard;