import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PagesNotFound from '../PagesNotFound/PagesNotFound';
import Footer from '../Footer/Footer';

const App = () => {
    return ( 
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
            <>
              <Header type="loggedIn" />
              <Movies />
              <Footer />
            </>
          } />

          <Route path='/saved-movies' element={
            <>
              <Header type="loggedIn" />
              <SavedMovies />
              <Footer />
            </>
          } />

          <Route path='/profile' element={
            <>
              <Header type="loggedIn" />
              <Profile />
            </>
          } />

          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route path='*' element={<PagesNotFound />} />
        </Routes>
      </>
    );
};

export default App;