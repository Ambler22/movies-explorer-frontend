import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import api from "../../../utils/MainApi";

const MoviesCard = ({ movie, savedMovies, setSavedMovies}) => {
  useEffect(() => {
    savedMovies && savedMovies.some((card) => card.nameEN === movie.nameEN) ?
        setIsLiked(true) : setIsLiked(false);
}, [savedMovies, movie.nameEN]);

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

    // сохранить фильм
 const handleSaveMovies = () => {
  const jwt = localStorage.getItem('jwt');

  if(!isLiked) {
    api.saveMovie(jwt, movie)
      .then((res) => {
        if (res._id) {
        setSavedMovies([res, ...savedMovies]);
        localStorage.setItem('saved', JSON.stringify([res, ...savedMovies]));
        setIsLiked(true);
        }
      })
      .catch(err => console.log(err))
  }

  if (isLiked) {
    const liked = savedMovies.find((card) => card.movieId === movie.id);
    api.deleteMovie(liked._id, jwt)
      .then((res) => {
        if (res) {
          setSavedMovies(savedMovies.filter((card) => card !== liked));
          setIsLiked(false)
        }
      })
  }
 };

     // удаление фильма
  const handleDeleteMovie = () => {
  const jwt = localStorage.getItem('jwt');
  api.deleteMovie(movie._id, jwt)
      .then((res) => {
          if (res) {
              setSavedMovies(savedMovies.filter((card) => card._id !== movie._id));
          }
      })
      .catch(err => console.log(err));
}

  // визуал кнопки лайка
  const location = useLocation()
  const [isLiked, setIsLiked] = useState(false);
  const like = isLiked ? '-active' : '';
  const deleteButton = '-delete';

  const buttonClassName = location.pathname === '/movies' ? like : deleteButton;

  const buttonClickFunction = location.pathname === '/movies' ? handleSaveMovies : handleDeleteMovie;

  return (
    <div className="card" id={movie._id}>
      <a className="card__link" href={movie.trailerLink} rel="noreferrer" target="_blank"><img className="card__image" src={location.pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`}/* {`https://api.nomoreparties.co${movie.image.url}`} */ alt={movie.nameRU} /></a>
      <div className="card__info">
        <h4 className="card__title">{movie.nameRU}</h4>
        <button className={`card__button card__button${buttonClassName}`} onClick={buttonClickFunction}></button>
      </div>
      <p className="card__duration">{getTimeFromMins(movie.duration)}</p>
    </div>
  )
};

export default MoviesCard;