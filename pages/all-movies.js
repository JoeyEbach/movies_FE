import React, { useEffect, useState } from 'react';
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
    <div className="general-cards-container">
      {movies.map((auth) => (
        <MovieCard key={auth.id} movieObj={auth} onUpdate={getAllTheMovies} />
      ))}
    </div>
  );
}
