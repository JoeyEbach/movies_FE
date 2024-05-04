/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getSingleMovie, deleteMovie, getAllMovies } from '../../api/movieData';
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
  const [admin, setAdmin] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  const allOfTheMovies = () => {
    getAllMovies().then(setAllMovies).then(router.push('/all-movies'));
  };

  const getMovieDetails = () => {
    getSingleMovie(id)?.then(setMovie);
  };

  useEffect(() => {
    getMovieDetails();
    getSingleUser(user.id).then((person) => {
      setCurrentUser(person);
      if (person.isAdmin) {
        setAdmin(true);
      }
    });
  }, [movie, user, allMovies]);

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

  const handleMovieDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${movie.title}?`)) {
      deleteMovie(movie.id).then(allOfTheMovies());
    }
  };

  const onUpdate = () => {
    setReviewing(false);
  };

  return (
    <>
      <div>
        <div className="details-header-container">
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.dateReleased}</h3>
            {movie.genres?.map((genre) => (
              <div key={genre.id}>
                <p>{genre.name}</p>
              </div>
            ))}
            <p>{movie.description}</p>
            <h3>{movie.rating}</h3>
          </div>
          <div className="details-image-container">
            <Image src={movie.image} alt={movie.title} className="center-image" />
            {admin ? (
              <>
                <div className="btn-container">
                  <Link passHref href={(`/movie/edit/${movie.id}`)}>
                    <Button type="click" variant="dark" className="btn"><FontAwesomeIcon icon={faPencil} style={{ color: '#683ce4' }} /></Button>
                  </Link>
                  <Button type="click" variant="dark" onClick={handleMovieDelete} className="btn"><FontAwesomeIcon icon={faTrash} style={{ color: '#683ce4' }} /></Button>
                </div>
              </>
            ) : null}
          </div>
        </div>

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
          <div className="reviewCard-details-container">
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
