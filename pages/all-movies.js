import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAllMovies } from '../api/movieData';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';
import { getAllGenres, getMoviesByGenre } from '../api/genreData';

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [admin, setAdmin] = useState(false);
  const { user } = useAuth();
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
    getSingleUser(user.id).then((person) => {
      if (person.isAdmin) {
        setAdmin(true);
      }
    });
  }, [user]);

  return (
    <>
      <div>
        {genres.map((g) => (
          <Button key={g.id} onClick={() => moviesByGenre(g.id)}>{g.name}</Button>
        ))}
      </div>
      <>
        {admin ? (
          <Link passHref href="/movie/new">
            <Button type="click" variant="primary">Add A Movie</Button>
          </Link>
        ) : null}
        <div className="cards">
          {isFiltered ? filteredMovies.map((m) => (
            <MovieCard key={m.id} movieObj={m} onUpdate={getAllTheMovies} />
          )) : movies.map((auth) => (
            <MovieCard key={auth.id} movieObj={auth} onUpdate={getAllTheMovies} />
          ))}
        </div>
      </>

    </>
  );
}
