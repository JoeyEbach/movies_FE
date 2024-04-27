/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getSingleMovie } from '../../api/movieData';
import ReviewCard from '../../components/ReviewCard';
import { deleteReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';
import ReviewForm from '../../components/forms/ReviewForm';

export default function ViewMovie() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState({});
  const [reviewing, setReviewing] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const { user } = useAuth();

  const getMovieDetails = () => {
    getSingleMovie(id)?.then(setMovie);
  };

  useEffect(() => {
    getMovieDetails();
  }, [movie]);

  useEffect(() => {
    getSingleUser(user.id).then(setCurrentUser);
  }, [user]);

  const handleEdit = (reviewId) => {
    router.push(`/reviews/edit/${reviewId}`);
  };

  const handleDelete = (reviewId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      deleteReview(reviewId).then(() => {
        getMovieDetails();
      });
    }
  };

  const onUpdate = () => {
    router.reload();
  };

  return (
    <>
      <div className="">
        <div>
          <Card>
            <Card.Img variant="top" src={movie.image} alt={movie.title} style={{ height: '400px' }} />
            <h4>{movie.dateReleased}</h4>
            {movie.genres?.map((genre) => (
              <div key={genre.id}>
                <h4>{movie.name}</h4>
              </div>
            ))}
            <h4>{movie.description}</h4>
            <h2>{movie.title}</h2>
            <h2>{movie.rating}</h2>
          </Card>
        </div>

        {!movie.reviews?.filter((rev) => rev.userId === currentUser.id).length && !reviewing && (
          <button type="button" onClick={() => setReviewing(true)}>Add A Review</button>
        )}

        {reviewing && (
          <ReviewForm user={currentUser.id} onUpdate={onUpdate} />
        )}

        {movie.reviews !== null && (
        <>
          <div className="d-flex flex-wrap item-container">
            {movie.reviews?.map((review) => (
              <ReviewCard key={review.id} reviewObj={review} isCurrentUser={currentUser === review.userId} editReview={handleEdit} deleteReview={handleDelete} />
            ))}
          </div>
        </>
        )}

      </div>

    </>
  );
}
