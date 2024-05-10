import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const searchMoviesByTitle = (searchValue) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/movies/search/${searchValue}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (!response.ok) {
        resolve([]);
      } else {
        return response.json();
      }
    })
    .then((data) => resolve(data))
    .catch(reject);
});
export default searchMoviesByTitle;
