/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleMovie } from '../../api/movieData';
import ReviewCard from '../../components/ReviewCard';
import { deleteReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';
import ReviewForm from '../../components/forms/ReviewForm';

export default function ViewMovie() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [movie, setMovie] = useState({});
  const [reviewing, setReviewing] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const getMovieDetails = () => {
    getSingleMovie(id)?.then(setMovie);
  };

  useEffect(() => {
    getMovieDetails();
  }, [movie]);

  useEffect(() => {
    getSingleUser(user.id).then(setCurrentUser);
  }, [user]);

  const handleEdit = () => {
    setReviewing(true);
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
    setReviewing(false);
  };

  return (
    <>
      <div className="card-container">
        <div>
          <Card>
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
          </Card>
        </div>

        <Link href={`/movie/${router.query.id}/recommendations`} passHref>
          <Button variant="primary">Recommend Similar Movies</Button>
        </Link>

        {/* <div className="cards">
          {allMovies
            .filter((m) => m.id !== movie.id)
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((auth) => (
              <RecCard key={auth.id} movieObj={auth} added="true" manage="true" onUpdate={getAllTheMovies} />
            ))}
        </div> */}

        {!reviewing && !movie.reviews?.filter((rev) => rev.userId === currentUser.id).length && (
          <button type="button" onClick={() => setReviewing(true)}>Add A Review</button>
        )}

        {reviewing && !movie.reviews?.filter((rev) => rev.userId === currentUser.id).length && (
          <ReviewForm user={currentUser.id} onUpdate={onUpdate} />
        )}

        {reviewing && movie.reviews.filter((rev) => rev.userId === currentUser.id).map((review) => (
          <ReviewForm key={review.id} reviewObj={review} user={currentUser.id} onUpdate={onUpdate} />
        ))}

        {movie.reviews !== null && (
        <>
          <div className="d-flex flex-wrap reviewCard-container" style={{ width: '100%' }}>
            {!reviewing && movie.reviews?.filter((review) => review.userId === currentUser.id).map((review) => (
              <ReviewCard key={review.id} reviewObj={review} editReview={handleEdit} deleteReview={handleDelete} userId={currentUser.id} />
            ))}
            {movie.reviews?.filter((review) => review.userId !== currentUser.id).map((review) => (
              <ReviewCard key={review.id} reviewObj={review} editReview={handleEdit} deleteReview={handleDelete} />
            ))}
          </div>
        </>
        )}

      </div>

    </>
  );
}
