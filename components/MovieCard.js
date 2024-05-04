import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { addToWatchlist } from '../api/movieData';
import { useAuth } from '../utils/context/authContext';

export default function MovieCard({ movieObj }) {
  // const [watchlistMovies, setWatchlistMovies] = useState({});
  const { user } = useAuth();

  const addToMyWatchlist = () => {
    if (window.confirm(`add ${movieObj.title} to wishlist?`)) {
      const payload = { userId: user.id, movieId: movieObj.id };
      addToWatchlist(payload);
    }
  };

  return (
    <Card className="card-style">
      <Card.Img variant="top" src={movieObj.image} alt={movieObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{movieObj.title}</Card.Title>
        <p className="card-text bold">{movieObj.dateReleased}</p>
        {movieObj.genres?.map((genre) => (
          <p key={genre.id} className="card-text bold">{genre.name}</p>
        ))}
        <Link href={`/movie/${movieObj.id}`} passHref>
          <Button variant="primary">VIEW</Button>
        </Link>
        <Button variant="info" onClick={addToMyWatchlist}>WISHLIST</Button>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movieObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    dateReleased: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};
