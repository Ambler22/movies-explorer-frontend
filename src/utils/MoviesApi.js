class MoviesApi {
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

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    })
    .then((res) => this._getResponseData(res));
  }
};

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;