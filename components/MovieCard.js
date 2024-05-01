/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function MovieCard({ movieObj }) {
  return (
    <Card className="card-style" style={{ height: '550px' }}>
      <Card.Img variant="top" src={movieObj.image} alt={movieObj.title} style={{ height: '350px' }} />
      <Card.Body>
        <h4>{movieObj.title.toUpperCase()}</h4>
        <div className="card-genres">
          {movieObj.genres?.map((genre) => (
            <p key={genre.id} className="card-individual-genre">{genre.name}</p>
          ))}
        </div>
        <div>
          <Link href={`/movie/${movieObj.id}`} passHref>
            <Button variant="dark" style={{ width: '25%' }}><FontAwesomeIcon icon={faEye} style={{ color: '#683ce4' }} /></Button>
          </Link>
          <Button className="card-btn" style={{ width: '75%' }} variant="dark">+ WATCHLIST</Button>
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
