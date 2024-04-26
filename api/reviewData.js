import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getReviewsByMovie = (movieId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/singleMovie/${movieId}`, {
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

const getReviewsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/singleUser/${userId}`, {
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

const getSingleReview = (movieId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/${movieId}/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews`, {
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

const updateReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/${payload.id}`, {
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

const deleteReview = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getReviewsByMovie,
  getReviewsByUser,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
