/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getSingleMovie, deleteMovie } from '../../api/movieData';
import ReviewCard from '../../components/ReviewCard';
import { deleteReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';
import ReviewForm from '../../components/forms/ReviewForm';
import { getRecsByMovie } from '../../api/recData';
import RecCard from '../../components/RecCard';

export default function ViewMovie() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [movie, setMovie] = useState({});
  const [reviewing, setReviewing] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [admin, setAdmin] = useState(false);
  // const [allMovies, setAllMovies] = useState([]);
  const [movieRecs, setMovieRecs] = useState([]);

  // const allOfTheMovies = () => {
  //   getAllMovies().then(setAllMovies).then(router.push('/all-movies'));
  // };

  const releaseDate = new Date(movie.dateReleased);
  const year = releaseDate.getFullYear();

  const countRecs = (recList) => {
    const flattenedRecs = [];
    recList.map((rec) => {
      if (!flattenedRecs.some((m) => m.id === rec.id)) {
        flattenedRecs.push({ ...rec, recCount: 1 });
      } else {
        const index = flattenedRecs.findIndex((m) => m.id === rec.id);
        flattenedRecs[index].recCount += 1;
      }
      return null;
    });
    return flattenedRecs;
  };

  const getMovieDetails = () => {
    getSingleMovie(id)
      ?.then(setMovie)
      .then(() => getRecsByMovie(id))
      .then((m) => countRecs(m.recommendedMovies))
      .then(setMovieRecs);
  };

  useEffect(() => {
    getMovieDetails();
  }, [reviewing, router]);

  useEffect(() => {
    getSingleUser(user.id).then((person) => {
      setCurrentUser(person);
      if (person.isAdmin) {
        setAdmin(true);
      }
    });
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

  const handleMovieDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${movie.title}?`)) {
      deleteMovie(movie.id)?.then(() => router.push('/all-movies'));
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
            <h3>{year}</h3>
            <p>{movie.description}</p>
            <div className="card-genres">
              {movie.genres?.map((genre) => (
                <p key={genre.id} className="card-individual-genre">{genre.name}</p>
              ))}
            </div>
          </div>
          <div>
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
      </div>

      {!!movieRecs.length && (<h3 className="movie-sentence">If you enjoyed <i>{movie.title}</i>...</h3>)}
      <div className="reviewCard-details-container">
        {movieRecs
          .sort((a, b) => a.title.localeCompare(b.title))
          .sort((a, b) => b.recCount - a.recCount)
          .slice(0, 6)
          .map((m) => (
            <RecCard key={m.id} movieObj={m} manage={false} recCount={movieRecs.filter((rec) => rec.id === m.id).length} />
          ))}
      </div>
      <div className="button-container">
        <Link href={`/movie/${router.query.id}/recommendations`} passHref>
          <Button id="card-btn-single-movie" style={{ width: '25%' }}>Manage Your Recommendations</Button>
        </Link>
      </div>
      <div className="button-container-review">
        {!reviewing && !movie.reviews?.filter((rev) => rev.userId === currentUser.id).length && (
        <Button id="review-btn" variant="dark" onClick={() => setReviewing(true)}>Add A Review</Button>
        )}
      </div>
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

    </>
  );
}
