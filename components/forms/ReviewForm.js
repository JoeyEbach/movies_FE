/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createReview } from '../../api/reviewData';

const initialState = {
  rating: 0,
  userId: 1,
  movieId: 1,
  commentReview: '',
  dateCreated: '',
};
export default function ReviewForm({ reviewObj, user, onUpdate }) {
  const [formData, setFormData] = useState(initialState);

  const toggleRating = (i) => {
    if (i === formData.rating) {
      setFormData({
        ...formData,
        rating: 0,
      });
    } else {
      setFormData({
        ...formData,
        rating: i,
      });
    }
    console.warn(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewObj.id) {
      console.warn(reviewObj, onUpdate);
    } else {
      console.warn({ ...formData, userId: user, dateCreated: Date() });
    }
  };

  return (
    <div className="addEditReview">
      <div className="formStars">
        {[...Array(5)].map((e, i) => (
          <button type="button" className={i + 1 <= reviewObj.rating ? 'goldStar' : 'grayStar'} key={i} onClick={() => toggleRating(i)}>★</button>
        ))}
      </div>
      <Form className="forms" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Control
            type="textarea"
            name="commentReview"
            value={formData.commentReview}
            placeholder="Type review..."
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {reviewObj.id ? 'Update Review' : 'Post Review'}
        </Button>
      </Form>
    </div>
  );
}

ReviewForm.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    userId: PropTypes.number,
    movieId: PropTypes.number,
    commentReview: PropTypes.string,
    dateCreated: PropTypes.string,
  }),
  user: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
ReviewForm.defaultProps = {
  reviewObj: initialState,
};
