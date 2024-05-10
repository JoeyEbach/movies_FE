import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';
import UserForm from '../components/forms/UserForm';
import { getTopMovies } from '../api/movieData';
import MovieCard from '../components/MovieCard';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getAllTopMovies = () => {
    getTopMovies().then(setTopMovies);
  };

  useEffect(() => {
    getAllTopMovies();
  }, []);

  useEffect(() => {
    getSingleUser(user.id).then(setCurrentUser);
  }, [user.id]);

  const onUpdate = () => {
    router.reload();
    getSingleUser(user.id).then(setCurrentUser);
    getAllTopMovies();
  };

  return (
    <>
      <h1>{currentUser === null ? (<h1>Create an Account</h1>) : (<h1>Popular This Week</h1>)}</h1>
      {currentUser === null ? (<UserForm onUpdate={onUpdate} />) : (
        <div className="general-cards-container">
          {topMovies.map((top) => (
            <MovieCard className="top-rated" key={top.id} movieObj={top} onUpdate={getAllTopMovies} />
          ))}

        </div>
      )}
    </>
  );
}
export default Home;
