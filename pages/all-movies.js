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
  const [activeButton, setActiveButton] = useState(null);
  const [activeAllButton, setActiveAllButton] = useState(false);

  const getAllTheMovies = () => {
    setIsFiltered(false);
    setActiveButton(null);
    setActiveAllButton(true);
    getAllMovies().then(setMovies);
  };

  const genresToFilter = () => {
    getAllGenres().then(setGenres);
  };

  const moviesByGenre = (id) => {
    getMoviesByGenre(id).then(setFilteredMovies);
    setIsFiltered(true);
  };

  const handleClick = (id) => {
    setActiveAllButton(false);
    setActiveButton(id);
    moviesByGenre(id);
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
      <div className="movie-details-header">
        <h1>All Movies</h1>
        <div>
          {admin ? (
            <Link passHref href="/movie/new">
              <Button className="details-header-btns" type="click" variant="dark">Add A Movie</Button>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="movies-btn-container">
        <h6>Filter By:</h6>
        <Button className={activeAllButton ? 'selected' : 'notSelected'} variant="dark" onClick={() => getAllTheMovies()}>
          All Movies
        </Button>
        {genres.map((g) => (
          <>
            <Button
              key={g.id}
              variant="dark"
              className={activeButton === g.id ? 'selected' : 'notSelected'}
              onClick={() => handleClick(g.id)}
            >{g.name}
            </Button>
          </>
        ))}
      </div>
      <div className="general-cards-container">
        {isFiltered ? filteredMovies.map((m) => (
          <MovieCard key={m.id} movieObj={m} onUpdate={getAllTheMovies} />
        )) : movies.map((auth) => (
          <MovieCard key={auth.id} movieObj={auth} onUpdate={getAllTheMovies} />
        ))}
      </div>
    </>
  );
}
