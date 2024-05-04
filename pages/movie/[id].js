/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMovie, getSingleMovie } from '../../api/movieData';
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
      <div className="card-container">
        <div>
          <Card>
            <div className="image-container">
              <Image src={movie.image} alt={movie.title} className="center-image" />
            </div>
            {admin ? (
              <>
                <Link passHref href={(`/movie/edit/${movie.id}`)}>
                  <Button type="click">Update Movie</Button>
                </Link>
                <Button type="click" variant="danger" onClick={handleMovieDelete}>Delete Movie</Button>
              </>
            ) : null}
            <h4>{movie.dateReleased}</h4>
            {movie.genres?.map((genre) => (
              <div key={genre.id}>
                <h4>{genre.name}</h4>
              </div>
            ))}
            <h4>{movie.description}</h4>
            <h2>{movie.title}</h2>
            <h2>{movie.rating}</h2>
          </Card>
        </div>

        <div className="cards">
          {movieRecs.length && (<h3>If you enjoyed <i>{movie.title}</i>...</h3>)}
          {movieRecs
            .sort((a, b) => a.title.localeCompare(b.title))
            .sort((a, b) => b.recCount - a.recCount)
            .slice(0, 6)
            .map((m) => (
              <RecCard key={m.id} movieObj={m} manage={false} recCount={movieRecs.filter((rec) => rec.id === m.id).length} />
            ))}
        </div>

        <Link href={`/movie/${router.query.id}/recommendations`} passHref>
          <Button variant="primary">Manage Your Recommendations</Button>
        </Link>

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
