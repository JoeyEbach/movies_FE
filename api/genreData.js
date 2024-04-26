import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllGenres = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/genres`, {
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

export default getAllGenres;
