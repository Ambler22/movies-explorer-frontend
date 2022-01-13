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

/*   updateUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._checkToken(this._headers),
      body: JSON.stringify({ name, email }),
    })
    .then((res) => this._getResponseData(res));
  }; */

  //movie

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/:movieId`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._checkToken(this._headers),
    })
    .then((res) => this._getResponseData(res));
  };


  // я х знает
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
  url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});
  
export default api;