import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';

export default function MovieCard({ movieObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movieObj.image} alt={movieObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{movieObj.title}</Card.Title>
        <p className="card-text bold">{movieObj.dateReleased}</p>
        <p className="card-text bold">{movieObj.genre}</p>
        <Button variant="primary">VIEW</Button>
        <Button variant="info">WISHLIST</Button>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movieObj: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    dateReleased: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
};
