import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';
import Link from 'next/link';

export default function MovieCard({ movieObj }) {
  return (
    <Card className="card-style">
      <Card.Img variant="top" src={movieObj.image} alt={movieObj.title} style={{ height: '350px' }} />
      <Card.Body>
        <title>{movieObj.title}</title>
        <div className="card-genres">
          {movieObj.genres?.map((genre) => (
            <p key={genre.id} className="card-individual-genre">{genre.name}</p>
          ))}
        </div>
        <Link href={`/movie/${movieObj.id}`} passHref>
          <Button variant="primary">VIEW</Button>
        </Link>
        <Button variant="info">WISHLIST</Button>
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
