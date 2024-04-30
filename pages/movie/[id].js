/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getSingleMovie } from '../../api/movieData';
import ReviewCard from '../../components/ReviewCard';
import { deleteReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewMovie() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [movie, setMovie] = useState({});

  const getMovieDetails = () => {
    getSingleMovie(id)?.then(setMovie);
  };

  useEffect(() => {
    getMovieDetails();
  }, [movie]);

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

  return (
    <>
      <div className="card-container">
        <div>
          <div className="image-container">
            <Image src={movie.image} alt={movie.title} className="center-image" />
          </div>
          <h4>{movie.dateReleased}</h4>
          {movie.genres?.map((genre) => (
            <div key={genre.id}>
              <h4>{movie.name}</h4>
            </div>
          ))}
          <h4>{movie.description}</h4>
          <h2>{movie.title}</h2>
          <h2>{movie.rating}</h2>
        </div>

        {movie.reviews !== null && (
        <>
          <div className="d-flex flex-wrap reviewCard-container" style={{ width: '100%' }}>
            {movie.reviews?.map((review) => (
              <ReviewCard key={review.id} reviewObj={review} editReview={handleEdit} deleteReview={handleDelete} userId={user.id} />
            ))}
          </div>
        </>
        )}

      </div>

    </>
  );
}
