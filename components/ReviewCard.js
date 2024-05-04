/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getSingleUser } from '../api/userData';

// const initialReview = {
//   rating: 3,
//   commentReview: 'It was good.',
//   dateCreated: '2024-04-25 19:26:56.190649',
//   authorName: 'User',
//   authorImage: 'https://s3-eu-west-1.amazonaws.com/blog-ecotree/blog/0001/01/ad46dbb447cd0e9a6aeecd64cc2bd332b0cbcb79.jpeg',
// };
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
      <div style={{ width: '100%' }}>
        <div className="reviewHead">
          <div className="stars-header">
            {reviewObj.rating > 0 && [...Array(reviewObj.rating)].map((e, i) => <p className="star goldstar" key={i}>★</p>)}
          </div>
          <p style={{ opacity: '50%' }}>By {author.name} on {reviewObj.dateCreated.split(' ')[0]}</p>
        </div>
        <p>{reviewObj.commentReview}</p>
        {currentUser
            && (
            <>
              <div className="review-card-btn-container">
                <Button type="button" className="review-card-btn" variant="dark" onClick={() => editReview(reviewObj.id)}><FontAwesomeIcon icon={faPencil} style={{ color: '#683ce4' }} /></Button>
                <Button type="button" className="review-card-btn" variant="dark" onClick={() => deleteReview(reviewObj.id)}><FontAwesomeIcon icon={faTrash} style={{ color: '#683ce4' }} /></Button>
              </div>
            </>
            )}
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
  editReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
