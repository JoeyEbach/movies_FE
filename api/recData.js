import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getRecsByMovie = (movieId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/singleMovie/recommendations/${movieId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getRecsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/singleUser/recommendations/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createRec = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/recommendations/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const deleteRec = (userId, recMovieId, movieId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${userId}/deleteRecommendation/${recMovieId}/fromMovie/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getRecsByMovie,
  getRecsByUser,
  createRec,
  deleteRec,
};
