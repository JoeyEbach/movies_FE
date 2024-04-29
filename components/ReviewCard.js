/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const initialReview = {
  rating: 3,
  commentReview: 'It was good.',
  dateCreated: '2024-04-25 19:26:56.190649',
  authorName: 'User',
  authorImage: 'https://s3-eu-west-1.amazonaws.com/blog-ecotree/blog/0001/01/ad46dbb447cd0e9a6aeecd64cc2bd332b0cbcb79.jpeg',
};
export default function ReviewCard({
  reviewObj, isCurrentUser, editReview, deleteReview,
}) {
  return (
    <div className="reviewCard">
      <Image src={reviewObj.authorImage} className="userImageReview" alt="User profile" />
      <div>
        <div className="reviewHead">
          <p className="reviewUser">{reviewObj.authorName}</p>
          {reviewObj.rating > 0 && [...Array(reviewObj.rating)].map((e, i) => <p className="star goldstar" key={i}>★</p>)}
          <p>{reviewObj.dateCreated.split(' ')[0]}</p>
          {isCurrentUser
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
    rating: PropTypes.number,
    commentReview: PropTypes.string,
    dateCreated: PropTypes.string,
    authorName: PropTypes.string,
    authorImage: PropTypes.string,
  }),
  isCurrentUser: PropTypes.bool,
  editReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
};

ReviewCard.defaultProps = {
  reviewObj: initialReview,
  isCurrentUser: true,
};
