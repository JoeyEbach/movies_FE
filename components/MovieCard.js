/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { addToWatchlist, removeFromWatchlist } from '../api/movieData';
import { useAuth } from '../utils/context/authContext';

export default function MovieCard({ movieObj, onUpdate }) {
  // const [watchlistMovies, setWatchlistMovies] = useState({});

  const { user } = useAuth();
  // const [wishlist, setWishlist] = useState([]);

  const addToMyWatchlist = () => {
    if (window.confirm(`add ${movieObj.title} to watchlist?`)) {
      const payload = { userId: user.id, movieId: movieObj.id };
      addToWatchlist(payload);
    }
  };

  const removeFromMyWatchlist = () => {
    if (window.confirm(`remove ${movieObj.title} from watchlist?`)) {
      removeFromWatchlist(user.id, movieObj.id).then(onUpdate);
    }
  };

  // const handleToggleWishlist = () => {
  //   if (wishlist.includes(movieObj)) {
  //     // If movie is already in Wishlist, remove it
  //     setWishlist(wishlist.filter((item) => item !== movieObj));
  //   } else {
  //     // If movie is not in Wishlist, add it
  //     setWishlist([...wishlist, movieObj]);
  //   }
  // };

  // const removeFromMyWatchlist = () => {
  //   if (window.confirm(`add ${movieObj.title} to watchlist?`)) {
  //     const payload = { userId: user.id, movieId: movieObj.id };
  //     removeFromWatchlist(payload);
  //   }
  // };

  return (
    <Card className="card-style" style={{ height: '550px' }}>
      <Link href={`/movie/${movieObj.id}`} passHref>
        <Card.Img variant="top" src={movieObj.image} alt={movieObj.title} style={{ height: '350px' }} />
      </Link>
      <Card.Body>
        <div>
          <Button className="card-btn" style={{ width: '75%' }} variant="dark" onClick={addToMyWatchlist}>+ WATCHLIST</Button>
          <Button variant="info" onClick={removeFromMyWatchlist}>
            REMOVE FROM WATCHLIST
          </Button>
        </div>
        <h4>{movieObj.title.toUpperCase()}</h4>
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
