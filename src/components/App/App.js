import React, {useEffect, useState} from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CuttentUserContext';

// компоненты
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PagesNotFound from '../PagesNotFound/PagesNotFound';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';
import PopupError from '../PopupError/PopupError';
import ProfilePopup from '../ProfilePopup/ProfilePopup'

// api
import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';

const App = () => {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const location = useLocation()

  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false);
  const [isProfilePopup, setIsProfilePopup] = useState(false);

  // пока тест
  const [isCheckBoxOpen, setIsCheckBoxOpen] = React.useState(false);
  const [searchError, setSearchError] = React.useState(false);
  //

  // Данные 
  useEffect(()=> {
    if (token) {
      auth.getContent(token)
      .then((userInfo) => {
        setIsLoggedIn(true);
        setIsRegistered(true);
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(err));
    }
  }, [token]);

      //Регистрация
  const handleRegistration = (email, password, name) => {
    auth.register(email, password, name)
      .then(() => {
        handleAuthorization(email, password);
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false)
        handleOpenErrorPopup();
      })
  };

       //Авторизация
  const handleAuthorization = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          setIsRegistered(true);
          navigate('/movies', {replace: true});
        }
      })
      .catch((error) => {
        console.log(error);
        handleOpenErrorPopup();
      })
  };

      //Выход
  function signOut() {
    localStorage.clear();
    localStorage.removeItem('saved');
    setMovies([]);
    setSavedMovies([]);
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/', {replace: true});
  }

      //Обновление почты и имени юзера
  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        showProfilePopup();
      })
      .catch((err) => {
        console.log(err);
        handleOpenErrorPopup();
      })
  };

//// ******* ////
// пробую сделать тест поиска
const searchMovie = (text) => {
  if (isLoggedIn) {
      const jwt = localStorage.getItem('jwt');

      if (location.pathname === '/movies') {

          if (!localStorage.getItem('all-movies')) {
            console.log(localStorage.getItem('all-movies'))
            moviesApi.findMovies()
                  .then((data) => {
                      setMovies(filterMovies(data, text));

                      const allMovies = JSON.stringify(data);
                      localStorage.setItem('all-movies', allMovies);
                  })
                  .catch((err) => console.log(err))
          } else {
              const searchList = JSON.parse(localStorage.getItem('all-movies'));
              setMovies(filterMovies(searchList, text));
          }
      }
      if (location.pathname === '/saved-movies') {
          api.getSavedMovies(jwt)
              .then((res) => {
                  setSavedMovies(filterMovies(res, text));

                  const saved = JSON.parse(res);
                  localStorage.setItem('saved', saved);
              })
              .catch((err) => console.log(err))
      }
  }
}

const filterMovies = (data, text) => {
  const searchList = data.filter((movie) => {
      if (movie.nameRU.toLowerCase().includes(text.toLowerCase())) {
          if ((movie.duration <= 40) && (isCheckBoxOpen)) {
              return movie;
          }
          if ((movie.duration >= 40) && (!isCheckBoxOpen)) {
              return movie;
          }
          return false;
      }
      return false;
  });

  if (searchList.length === 0) {
      setSearchError(true)
  } else {
      setSearchError(false)
  }

  const searchResult = JSON.stringify(searchList);
  localStorage.setItem('search', searchResult); 

  return searchList;
};

useEffect(() => {
  // const saved = localStorage.getItem('saved');
  if (localStorage.getItem('saved')) {
      setSavedMovies(JSON.parse(localStorage.getItem('saved')));
  }
}, [navigate]);

useEffect(() => {
  if (isLoggedIn) {
      if (!localStorage.getItem('saved')) {
          api.getSavedMovies(localStorage.getItem('jwt'))
              .then((res) => {
                  setSavedMovies(res);
              })
              .catch(err => console.log(err));
      }
  }
}, [savedMovies, navigate, isLoggedIn]);

useEffect(() => {
  if (savedMovies) {
      localStorage.setItem('saved', JSON.stringify(savedMovies));
  }
}, [savedMovies]);
//// ******* ////

  // сохранить фильм
/*  const handleSaveMovies = () => {
  const jwt = localStorage.getItem('jwt');

  api.saveMovie(jwt, movie)
    .then((res) => {
      if (res._id) {
      setSavedMovies([...savedMovies, res]); */
      /* localStorage.setItem('saved', JSON.stringify(...savedMovies.data)); */
/*       }
      console.log('сохранен')
    })
    .catch(err => console.log(err))
 }; */

//удаление фильма
/* const handleDeleteMovies = (movie) => {
  api.deleteMovie(movie._id)
    .then(() => {
      localStorage.setItem('saved', JSON.stringify(savedMovies.filter((item) => item !== movie)));
      setSavedMovies(savedMovies.filter((item) => item !== movie));
    })
    .catch(err => console.log(err))
}; */

    // попапы
const handleOpenErrorPopup = () => setIsErrorPopupOpened(true);
const handleCloseErrorPopup = () => setIsErrorPopupOpened(false);

const showProfilePopup = () => {
  setIsProfilePopup(true)
  setTimeout(() => setIsProfilePopup(false), 2000);
}

 //Закрытие попапа на Esc
 useEffect(() => {
  const closeErrorPopupByEscape = (event) => {
    if (event.key === 'Escape') {
      handleCloseErrorPopup();
    }
  }
  document.addEventListener('keydown', closeErrorPopupByEscape)
  return () => document.removeEventListener('keydown', closeErrorPopupByEscape)
}, []);

    return (
      <CurrentUserContext.Provider value={currentUser}>
      <>
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          } />
            
          <Route path='/movies' element={
            <ProtectedRoute isLoggedIn={token}>
              <>
                <Header type="loggedIn" />
                <Movies
                  movies={movies}
                  setMovies={setMovies}
                  searchMovie={searchMovie}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  /* handleSearchMovie={handleSearchMovie} */
                  /* handleSaveMovies={handleSaveMovies} */
                  
                  searchError={searchError}
                  setSearchError={setSearchError}/>
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path='/saved-movies' element={
            <ProtectedRoute isLoggedIn={token}>
              <>
                <Header type="loggedIn" />
                <SavedMovies 
                  /* movies={movies} */
                  movies={savedMovies}
                  searchMovie={searchMovie}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  searchError={searchError}
                  setSearchError={setSearchError}
                  /* onDelete={handleDeleteMovies} */
                  /* handleSearchMovie={handleSearchMovie} */ 
                  />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path='/profile' element={
            <ProtectedRoute isLoggedIn={token}>
              <>
                <Header type="loggedIn" />
                <Profile isLoggedIn={token} name={currentUser.name} handleUpdateUser={handleUpdateUser} signOut={signOut}/>
              </>
            </ProtectedRoute>
          } />

          <Route path='/signup' element={<Register handleRegistration={handleRegistration}/>} />
          <Route path='/signin' element={<Login handleAuthorization={handleAuthorization}/>} />
          <Route path='*' element={<PagesNotFound />} />
        </Routes>
      </>
      <PopupError
        isOpen={isErrorPopupOpened}
        onClose={handleCloseErrorPopup}
        isRegistered={isRegistered}
        />
        <ProfilePopup onUpdate={isProfilePopup} />
      </CurrentUserContext.Provider>
    );
};

export default App;