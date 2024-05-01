import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllMovies = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleMovie = (movieId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/movies/${movieId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getTopMovies = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/movies/toprated`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getRecentMovies = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/movies/recent`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createMovie = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateMovie = (payload, movieId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/movies/${movieId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteMovie = (movieId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/movies/remove/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllMovies,
  getSingleMovie,
  deleteMovie,
  getTopMovies,
  getRecentMovies,
  createMovie,
  updateMovie,
};
