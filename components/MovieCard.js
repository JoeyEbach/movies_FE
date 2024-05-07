/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';
import Link from 'next/link';

export default function MovieCard({ movieObj }) {
  // const [watchlistMovies, setWatchlistMovies] = useState({});

  return (
    <Card className="card-style" style={{ height: '550px' }}>
      <Link href={`/movie/${movieObj.id}`} passHref>
        <Card.Img variant="top" src={movieObj.image} alt={movieObj.title} style={{ height: '350px' }} />
      </Link>
      <Card.Body>
        <div>
          <Button className="card-btn" style={{ width: '75%' }} variant="dark">+ WATCHLIST</Button>
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
};
