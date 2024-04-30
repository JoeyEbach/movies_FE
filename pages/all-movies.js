import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAllMovies } from '../api/movieData';
import MovieCard from '../components/MovieCard';

export default function AllMovies() {
  const [movies, setMovies] = useState([]);

  const getAllTheMovies = () => {
    getAllMovies().then(setMovies);
  };

  useEffect(() => {
    getAllTheMovies();
  }, []);
  return (
    <>
      <Link passHref href="/movie/new">
        <Button type="click" variant="primary">Add A Movie</Button>
      </Link>
      <div className="cards">
        {movies.map((auth) => (
          <MovieCard key={auth.id} movieObj={auth} onUpdate={getAllTheMovies} />
        ))}
      </div>
    </>
  );
}
