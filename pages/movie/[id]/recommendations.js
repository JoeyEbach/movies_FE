import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, FormControl } from 'react-bootstrap';
import { getAllMovies, getSingleMovie } from '../../../api/movieData';
import RecCard from '../../../components/RecCard';
import { getRecsByUser } from '../../../api/recData';
import { useAuth } from '../../../utils/context/authContext';

export default function Recommendations() {
  const [allMovies, setAllMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [userRecs, setUserRecs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const singleMovieId = Number(router.query.id);
  const { user } = useAuth();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const updateRecs = () => {
    getRecsByUser(user.id)
      .then((recs) => {
        const [matchedRecs] = recs.recommendations.filter((rec) => rec.singleMovie.id === singleMovieId);
        setUserRecs(matchedRecs);
      });
  };

  const getAllTheMovies = () => {
    getAllMovies()
      .then(setAllMovies)
      .then(() => updateRecs());
  };

  useEffect(() => {
    getAllTheMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSingleMovie(singleMovieId).then(setMovie);
  }, [singleMovieId]);

  return (
    <>
      <h1>Manage Recommendations for <i>{movie.title}</i></h1>
      <h3>Your Recommendations</h3>
      <div className="cards">
        {userRecs?.recommendedMovies
          ?.sort((a, b) => a.title.localeCompare(b.title))
          .map((m) => (
            <RecCard key={m.id} movieObj={m} added manage onUpdate={updateRecs} />
          ))}
      </div>
      <h3>Add</h3>
      <Form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <FormControl type="text" id="search" placeholder="Filter by Title..." onChange={handleChange} value={searchInput} />
      </Form>
      <div className="cards">
        {allMovies
          .filter((m) => m.title.toLowerCase().includes(searchInput))
          .filter((m) => m.id !== movie.id)
          .filter((m) => !userRecs?.recommendedMovies?.some((r) => m.id === r.id))
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((auth) => (
            <RecCard key={auth.id} movieObj={auth} manage onUpdate={updateRecs} />
          ))}
      </div>
    </>
  );
}
