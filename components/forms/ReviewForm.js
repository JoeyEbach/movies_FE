/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createReview, updateReview } from '../../api/reviewData';

const initialState = {
  rating: 0,
  commentReview: '',
};
export default function ReviewForm({ reviewObj, user, onUpdate }) {
  const [formData, setFormData] = useState(reviewObj || initialState);
  const [starColor, setStarColor] = useState([...Array(5).fill('goldstar')]);
  const router = useRouter();

  const toggleRating = (stars) => {
    if (stars === formData.rating) {
      setFormData((prevState) => ({
        ...prevState,
        rating: 0,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        rating: stars,
      }));
    }
  };

  useEffect(() => {
    const newColors = [...Array(5).fill('goldstar').fill('graystar', formData.rating)];
    setStarColor([...newColors]);
  }, [formData.rating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rating > 0 || formData.commentReview !== '') {
      if (reviewObj.id) {
        // console.warn({ ...formData, dateCreated: new Date(formData.dateCreated) });
        updateReview({ ...formData, dateCreated: new Date(formData.dateCreated) }).then(onUpdate);
      } else {
        createReview({
          ...formData, userId: user, movieId: Number(router.query.id), dateCreated: new Date(),
        }).then(onUpdate);
      }
    }
  };

  return (
    <div className="addEditReview">
      <div className="formStars">
        {starColor.map((e, i) => (
          <button type="button" className={`star ${e}`} key={i} onClick={() => toggleRating(i + 1)}>★</button>
        ))}
      </div>
      <Form className="forms" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Control
            as="textarea"
            name="commentReview"
            value={formData.commentReview}
            placeholder="Add comments..."
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            rows={3}
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
