import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';
import UserForm from '../components/forms/UserForm';
import MovieCard from '../components/MovieCard';
import { getTopMovies } from '../api/movieData';

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
  }, [user]);

  const onUpdate = () => {
    router.reload();
    getSingleUser(user.id).then(setCurrentUser);
  };

  return (
    <>
      {currentUser === null ? (<UserForm onUpdate={onUpdate} />) : (
        <div className="cards">
          {topMovies.map((top) => (
            <MovieCard className="top-rated" key={top.id} movieObj={top} onUpdate={getAllTopMovies} />
          ))}

        </div>
      )}
    </>
  );
}
export default Home;
