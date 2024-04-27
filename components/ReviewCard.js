/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const initialReview = {
  rating: 5,
  review: 'It was good.',
  dateCreated: Date(),
  user: {
    name: 'User',
    image: '',
  },
};
export default function ReviewCard({ reviewObj }) {
  return (
    <div className="reviewCard">
      <div className="reviewUser">
        <Image src={reviewObj.user.image} alt="User profile" />
        <p>{reviewObj.user.name}</p>
      </div>
      <div className="reviewText">
        {reviewObj.rating > 0
          && (
          <div>
            {[...Array(reviewObj.rating)].map((e, i) => <p className="star" key={i}>★</p>)}
          </div>
          )}
        <p>{reviewObj.review}</p>
        <p>{reviewObj.dateCreated}</p>
      </div>
    </div>
  );
}

ReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    review: PropTypes.string,
    rating: PropTypes.number,
    dateCreated: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
};

ReviewCard.defaultProps = {
  reviewObj: initialReview,
};
