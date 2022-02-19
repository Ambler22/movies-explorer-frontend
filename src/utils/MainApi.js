class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  };

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  };

  _checkToken = (headers) => {
    const token = localStorage.getItem('jwt');

    if (token) {
      headers['authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  // user

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._checkToken(this._headers),
    })
    .then((res) => this._getResponseData(res));
  };

  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._checkToken(this._headers),
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
    .then((res) => this._getResponseData(res));
  };

  //movie

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._checkToken(this._headers),
    })
    .then((res) => this._getResponseData(res));
  };

  saveMovie(token, {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
}) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._checkToken(this._headers),
      body: JSON.stringify({
        country: country === "" ? nameEN : country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailerLink:  trailerLink === null ? `https://api.nomoreparties.co${image.url}` : trailerLink,
        thumbnail: `https://api.nomoreparties.co${image.url}`,
        nameRU, 
        nameEN: nameEN === '' ? nameRU : nameEN,
        movieId: id,
    })
    })
    .then((res) => this._getResponseData(res));
  }

  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._checkToken(this._headers),
    })
    .then((res) => this._getResponseData(res));
  };
}

const api = new Api({
  // url: 'http://api.movies.ex.nomoredomains.rocks',
  url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});
  
export default api;