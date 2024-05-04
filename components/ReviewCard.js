/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { getSingleUser } from '../api/userData';

export default function ReviewCard({
  reviewObj, editReview, deleteReview, userId,
}) {
  const [currentUser, setCurrentUser] = useState(false);
  const [author, setAuthor] = useState({});

  const checkIfUser = () => {
    getSingleUser(reviewObj.userId).then(setAuthor);
    if (userId === reviewObj.userId) {
      setCurrentUser(true);
    }
  };

  useEffect(() => {
    checkIfUser();
  }, []);

  return (
    <div className="reviewCard">
      <Image src={author.image} className="userImageReview" alt="User profile" />
      <div>
        <div className="reviewHead">
          <p className="reviewUser">{author.name}</p>
          {reviewObj.rating > 0 && [...Array(reviewObj.rating)].map((e, i) => <p className="star goldstar" key={i}>★</p>)}
          <p>{reviewObj.dateCreated.split(' ')[0]}</p>
          {currentUser
            && (
            <>
              <button type="button" className="btn btn-danger" onClick={() => editReview(reviewObj.id)}>Edit</button>
              <button type="button" className="btn btn-success" onClick={() => deleteReview(reviewObj.id)}>Delete</button>
            </>
            )}
        </div>
        <p>{reviewObj.commentReview}</p>
      </div>
    </div>
  );
}

ReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    rating: PropTypes.number,
    commentReview: PropTypes.string,
    dateCreated: PropTypes.string,
    authorName: PropTypes.string,
    authorImage: PropTypes.string,
  }).isRequired,
  editReview: PropTypes.func,
  deleteReview: PropTypes.func,
  userId: PropTypes.number,
};

ReviewCard.defaultProps = {
  editReview: null,
  deleteReview: null,
  userId: 0,
};
