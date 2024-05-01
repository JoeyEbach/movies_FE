import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllMovies } from '../api/movieData';
import MovieCard from '../components/MovieCard';
import { getAllGenres, getMoviesByGenre } from '../api/genreData';

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const getAllTheMovies = () => {
    setIsFiltered(false);
    getAllMovies().then(setMovies);
  };

  const genresToFilter = () => {
    getAllGenres().then(setGenres);
  };

  const moviesByGenre = (id) => {
    getMoviesByGenre(id).then(setFilteredMovies);
    setIsFiltered(true);
  };

  useEffect(() => {
    getAllTheMovies();
    genresToFilter();
  }, []);

  return (
    <>
      <div>
        {genres.map((g) => (
          <Button key={g.id} onClick={() => moviesByGenre(g.id)}>{g.name}</Button>
        ))}
      </div>
      <div className="cards">
        {isFiltered ? filteredMovies.map((m) => (
          <MovieCard key={m.id} movieObj={m} onUpdate={getAllMovies} />
        )) : movies.map((auth) => (
          <MovieCard key={auth.id} movieObj={auth} onUpdate={getAllTheMovies} />
        ))}
      </div>
    </>

  );
}
