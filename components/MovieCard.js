/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { addToWatchlist, removeFromWatchlist, getWatchlistMovies } from '../api/movieData';
import { useAuth } from '../utils/context/authContext';

export default function MovieCard({ movieObj, onUpdate }) {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [onWatchList, setOnWatchList] = useState(false);
  const { user } = useAuth();

  const addToMyWatchlist = () => {
    if (window.confirm(`add ${movieObj.title} to watchlist?`)) {
      const payload = { userId: user.id, movieId: movieObj.id };
      addToWatchlist(payload).then(onUpdate);
    }
  };

  const removeFromMyWatchlist = () => {
    if (window.confirm(`remove ${movieObj.title} from watchlist?`)) {
      removeFromWatchlist(user.id, movieObj.id);
    }
  };

  const checkWatchlist = () => {
    getWatchlistMovies(user.id).then((person) => setWatchlistMovies(person.movies));
    const movieCheck = watchlistMovies.some((movie) => movie.id === movieObj.id);
    if (movieCheck === true) {
      setOnWatchList(true);
    }
  };

  useEffect(() => {
    checkWatchlist();
  }, [watchlistMovies]);

  return (
    <Card className="card-style" style={{ height: '550px' }}>
      <Link href={`/movie/${movieObj.id}`} passHref>
        <Card.Img variant="top" src={movieObj.image} alt={movieObj.title} style={{ height: '350px' }} />
      </Link>
      <Card.Body>
        <div>
          {onWatchList === true ? (
            <Button className="card-btn" style={{ width: '75%' }} variant="dark" onClick={removeFromMyWatchlist}>- WATCHLIST</Button>
          ) : (
            <Button className="card-btn" style={{ width: '75%' }} variant="dark" onClick={addToMyWatchlist}>+ WATCHLIST</Button>
          )}
        </div>
        <h4>{movieObj.title.toUpperCase()}</h4>
        <div className="card-genres">
          {movieObj.genres?.map((genre) => (
            <p key={genre.id} className="card-individual-genre">{genre.name}</p>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movieObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
