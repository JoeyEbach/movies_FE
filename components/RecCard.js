/* eslint-disable no-nested-ternary */
import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createRec, deleteRec } from '../api/recData';
import { useAuth } from '../utils/context/authContext';

export default function RecCard({
  movieObj, singleMovieId, added, manage, onUpdate,
}) {
  const router = useRouter();
  const { user } = useAuth();

  const redirect = () => {
    if (!manage) {
      router.push(`/movie/${movieObj.id}`);
    }
  };

  const handleClick = () => {
    if (added) {
      deleteRec(user.id, movieObj.id, (singleMovieId || router.query.id))
        .then(onUpdate);
    } else {
      createRec({
        recUserId: user.id,
        recommendedMovieId: movieObj.id,
        singleMovieId: router.query.id,
      })
        .then(onUpdate);
    }
  };

  return (
    <div className="rec-card">
      {manage && (<button type="button" className="add-remove-rec" onClick={handleClick}>{added ? '-' : '+'}</button>)}
      <Image src={movieObj.image} alt={movieObj.title} onClick={redirect} className="rec-image" />
      <p className="rec-title">{movieObj.title}</p>
      {!manage && (<p className="rec-users">Recommended By {movieObj.recCount} {movieObj.recCount === 1 ? 'User' : 'Users'}</p>)}
    </div>
  );
}

RecCard.propTypes = {
  movieObj: PropTypes.shape({
    singleMovieId: PropTypes.number,
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
    recCount: PropTypes.number,
  }).isRequired,
  singleMovieId: PropTypes.number,
  added: PropTypes.bool,
  manage: PropTypes.bool,
  onUpdate: PropTypes.func,
};

RecCard.defaultProps = {
  singleMovieId: 0,
  added: false,
  manage: false,
  onUpdate: null,
};
