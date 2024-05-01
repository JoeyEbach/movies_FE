import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAllMovies } from '../api/movieData';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [admin, setAdmin] = useState(false);
  const { user } = useAuth();

  const getAllTheMovies = () => {
    getAllMovies().then(setMovies);
  };

  useEffect(() => {
    getAllTheMovies();
    getSingleUser(user.id).then((person) => {
      if (person.isAdmin) {
        setAdmin(true);
      }
    });
  }, [user]);

  return (
    <>
      {admin ? (
        <Link passHref href="/movie/new">
          <Button type="click" variant="primary">Add A Movie</Button>
        </Link>
      ) : null}
      <div className="cards">
        {movies.map((auth) => (
          <MovieCard key={auth.id} movieObj={auth} onUpdate={getAllTheMovies} />
        ))}
      </div>
    </>
  );
}
