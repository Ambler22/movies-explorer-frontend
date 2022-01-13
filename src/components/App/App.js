import React, {useEffect, useState} from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PagesNotFound from '../PagesNotFound/PagesNotFound';
import Footer from '../Footer/Footer';
import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import { CurrentUserContext } from '../../context/CuttentUserContext';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';

const App = () => {
  const token = localStorage.getItem('jwt');

  const [currentUser, setCurrentUser] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = ([]);

  const navigate = useNavigate();

  useEffect(()=> {
    if (token) {
      console.log(token)
      auth.getContent(token)
      .then((userInfo) => {
        setIsLoggedIn(true);
        setIsRegistered(true);
        setCurrentUser(userInfo);
      })
      .catch((error) => console.log(error));
    }
  }, [navigate, token]);

  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([
        api.getUserInfo(),
        moviesApi.findMovies()
      ])
      .then(([userData, movies]) => {
        console.log(userData, movies);
        setCurrentUser(userData);
        localStorage.setItem('movies', JSON.stringify(movies));
        setMovies(movies);
      })
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  //registration
  const handleRegistration = (email, password, name) => {
    auth.register(email, password, name)
      .then((data) => {
        console.log(data)
        handleAuthorization(email, password);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  //authorization
  const handleAuthorization = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          navigate('/movies', {replace: true});
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };


  function signOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/', {replace: true});
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  ////////////////////////// movies
  const [preloader, setPreloader] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);
  const [isCheckBoxOpen, setIsCheckBoxOpen] = React.useState(false);
  const [searchError, setSearchError] = React.useState(false);

  const searchMovie = (text) => {
    if (isLoggedIn) {
        const jwt = localStorage.getItem('jwt');

        if (window.location.pathname === '/movies') {

            if (!localStorage.getItem('all-movies')) {
                setPreloader(true);

                moviesApi.findMovies()
                    .then((data) => {
                        console.log(data);
                        setMovies(filterMovies(data, text));

                        const allMovies = JSON.stringify(data);
                        localStorage.setItem('all-movies', allMovies);
                    })
                    .catch(() => setInputError(true))
                    .finally(() => setPreloader(false));

            } else {
                const searchList = JSON.parse(localStorage.getItem('all-movies'));
                setMovies(filterMovies(searchList, text));
            }
        }

        if (window.location.pathname === '/saved-movies') {
            setPreloader(true);
            api.getSavedMovies(jwt)
                .then((res) => {
                    setSavedMovies(filterMovies(res, text));

                    const saved = JSON.parse(res);
                    localStorage.setItem('saved', saved);
                })
                .catch(() => setSearchError(true))
                .finally(() => setPreloader(false));
        }
    }
}

const filterMovies = (data, text) => {
    const searchList = data.filter((movie) => {
        if (movie.nameRU.toLowerCase().includes(text.toLowerCase())) {
            if ((movie.duration <= 40) && (isCheckBoxOpen)) {
                console.log(movie);
                return movie;
            }
            if ((movie.duration >= 40) && (!isCheckBoxOpen)) {
                return movie;
            }
            return false;
        }
        return false;
    });

    console.log(searchList);

    if (searchList.length === 0) {
        console.log(searchList.length);
        setSearchError(true);
        console.log(searchError);
    } else {
        setSearchError(false);
        console.log(searchError);
    }

    const searchResult = JSON.stringify(searchList);
    localStorage.setItem('search', searchResult);

    return searchList;
};

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
                  searchMovie={searchMovie}

                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies} />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path='/saved-movies' element={
            <ProtectedRoute isLoggedIn={token}>
              <>
                <Header type="loggedIn" />
                <SavedMovies movies={movies} />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path='/profile' element={
            <ProtectedRoute isLoggedIn={token}>
              <>
                <Header type="loggedIn" />
                <Profile isLoggedIn={token} /* name={currentUser.name} */ handleUpdateUser={handleUpdateUser} signOut={signOut}/>
              </>
            </ProtectedRoute>
          } />

          <Route path='/signup' element={<Register handleRegistration={handleRegistration}/>} />
          <Route path='/signin' element={<Login handleAuthorization={handleAuthorization}/>} />
          <Route path='*' element={<PagesNotFound />} />
        </Routes>
      </>
      </CurrentUserContext.Provider>
    );
};

export default App;