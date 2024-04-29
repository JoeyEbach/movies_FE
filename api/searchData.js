import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const searchMoviesByTitle = (searchValue) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/movies/search/${searchValue}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});
export default searchMoviesByTitle;
