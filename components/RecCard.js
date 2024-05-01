/* eslint-disable no-nested-ternary */
import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function RecCard({ movieObj, added, manage }) {
  return (
    <div className="rec-card">
      <button type="button" className="add-remove-rec">{manage ? (added ? '-' : '+') : '🔎'}</button>
      <Image src={movieObj.image} alt={movieObj.title} className="rec-image" />
      <p className="rec-title">{movieObj.title}</p>
      {!manage && (<p className="rec-users">Recommended By {} Users</p>)}
    </div>
  );
}

RecCard.propTypes = {
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
  added: PropTypes.bool,
  manage: PropTypes.bool,
};

RecCard.defaultProps = {
  added: false,
  manage: false,
};
