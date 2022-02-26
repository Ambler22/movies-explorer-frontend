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

  const [isCheckBoxOpen, setIsCheckBoxOpen] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [checkSavedCards, setCheckSavedCards] = useState(false);
  //

  // Данные 
  useEffect(()=> {
    if (token) {
      //auth.getData(token)
      api.checkTokenOnServer(token)
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
    auth.registration(email, password, name)
      .then(() => {
        handleAuthorization(email, password);
      })
      .catch((err) => {
        console.log(err)
        setIsRegistered(false)
        handleOpenPopupError();
      })
  };

       //Авторизация
  const handleAuthorization = (email, password) => {
    auth.authorization(email, password)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          setIsRegistered(true);
          navigate('/movies', {replace: true});
        }
      })
      .catch((err) => {
        console.log(err)
        handleOpenPopupError();
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
        handleOpenPopupError();
      })
  };

      // Поиск фильмов
  const searchMovie = (text) => {
    if (isLoggedIn) {
      const jwt = localStorage.getItem('jwt');

      if (location.pathname === '/movies') {

          if (!localStorage.getItem('all-movies')) {
            moviesApi.getMovies()
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
      else if (location.pathname === '/saved-movies') {
          api.getSavedMovies(jwt)
              .then((res) => {
                  setSavedMovies(filterMovies(res, text));
                  localStorage.setItem('saved', JSON.stringify(res));
              })
              .catch((err) => console.log(err))
      }
  }
}

const filterMovies = (data, text) => {
  const searchList = data.filter((movie) => {
      if (movie.nameRU.toLowerCase().includes(text.toLowerCase())) {
          if ((movie.duration <= 1) && (isCheckBoxOpen)) {
              return movie;
          }
          if ((movie.duration >= 1) && (!isCheckBoxOpen)) {
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

  if (location.pathname === '/movies') {
    const searchResult = JSON.stringify(searchList);
    localStorage.setItem('search', searchResult);
  }

  if (location.pathname === '/saved-movies') {
    const searchResult = JSON.stringify(searchList);
    localStorage.setItem('searchSaved', searchResult);
  }

  return searchList;
};

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
  api.getSavedMovies(localStorage.getItem('jwt'))
  .then((res) => {
    setSavedMovies(res)
  })
}, []);

useEffect(() => {
  if (savedMovies) {
      localStorage.setItem('saved', JSON.stringify(savedMovies));
  }
}, [savedMovies]);

    // попапы
const handleOpenPopupError = () => setIsErrorPopupOpened(true);
const handleClosePopupError = () => setIsErrorPopupOpened(false);

const showProfilePopup = () => {
  setIsProfilePopup(true)
  setTimeout(() => setIsProfilePopup(false), 2000);
}

 //Закрытие попапа на Esc
 useEffect(() => {
  const closeErrorPopupByEsc = (event) => {
    if (event.key === 'Escape') {
      handleClosePopupError();
    }
  }
  document.addEventListener('keydown', closeErrorPopupByEsc)
  return () => document.removeEventListener('keydown', closeErrorPopupByEsc)
}, []);

const renderMainWithLoggin = () => {
  return (
    <>
      <Header isLoggedIn={token} />
      <Main />
      <Footer />
    </>
  )
};

const navigateLoggedInUser = () => {
  if (location.pathname === '/signup') {
    return isLoggedIn ? renderMainWithLoggin() : <Register handleRegistration={handleRegistration} />
  }
  if (location.pathname === '/signin') {
    return isLoggedIn ? renderMainWithLoggin() : <Login handleAuthorization={handleAuthorization} />
  }
};

    return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/' element={
            <>
              <Header isLoggedIn={token}/>
              <Main />
              <Footer />
            </>
          } />
            
          <Route path='/movies' element={
            <ProtectedRoute isLoggedIn={token}>
              <>
                <Header isLoggedIn={token} />
                <Movies
                  movies={movies}
                  setMovies={setMovies}
                  searchMovie={searchMovie}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}

                  searchError={searchError}
                  setSearchError={setSearchError}

                  checkbox={checkbox}
                  setCheckbox={setCheckbox}/>
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path='/saved-movies' element={
            <ProtectedRoute isLoggedIn={token}>
              <>
                <Header isLoggedIn={token} />
                <SavedMovies 
                  movies={savedMovies}
                  setMovies={setMovies}
                  searchMovie={searchMovie}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}

                  searchError={searchError}
                  setSearchError={setSearchError}

                  checkSavedCards={checkSavedCards}
                  setCheckSavedCards={setCheckSavedCards}
                  />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path='/profile' element={
            <ProtectedRoute isLoggedIn={token}>
              <>
                <Header isLoggedIn={token} />
                <Profile isLoggedIn={token}
                  name={currentUser.name}
                  handleUpdateUser={handleUpdateUser}
                  signOut={signOut}/>
              </>
            </ProtectedRoute>
          } />

          <Route path='/signup' element={navigateLoggedInUser()} />
          <Route path='/signin' element={navigateLoggedInUser()} />
          <Route path='*' element={<PagesNotFound />} />
        </Routes>
      </div>

      <PopupError
        isOpen={isErrorPopupOpened}
        onClose={handleClosePopupError}
        isRegistered={isRegistered}
        />
        <ProfilePopup onUpdate={isProfilePopup} />
      </CurrentUserContext.Provider>
    );
};

export default App;