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
  const [myStyle, setMyStyle] = useState({});

  const getAllTheMovies = () => {
    setIsFiltered(false);
    getAllMovies().then(setMovies);
  };

  const genresToFilter = () => {
    getAllGenres().then(setGenres);
    setMyStyle(false);
  };

  const moviesByGenre = (id) => {
    getMoviesByGenre(id).then(setFilteredMovies);
    setIsFiltered(true);
  };

  const handleClick = (id) => {
    setMyStyle((prevState) => ({
      ...myStyle,
      [id]: !prevState[id],
    }));
    moviesByGenre(id);
  };

  useEffect(() => {
    getAllTheMovies();
    genresToFilter();
    moviesByGenre();
    getSingleUser(user.id).then((person) => {
      if (person.isAdmin) {
        setAdmin(true);
      }
    });
  }, [user]);

  return (
    <>
      <h1>All Movies</h1>
      <div className="movies-btn-container">
        <h6>Filter By:</h6>
        <Button className="notSelected" variant="dark" onClick={() => getAllTheMovies()}>
          All Movies
        </Button>
        {genres.map((g, i) => (
          <>
            <Button
              key={g.id}
              variant="dark"
              className="notSelected"
              style={{
                backgroundColor: myStyle[`${i}`] ? '#10e5b2' : 'initial',
              }}
              onClick={handleClick}
            >{g.name}
            </Button>
          </>
        ))}
      </div>
      <>
        {admin ? (
          <Link passHref href="/movie/new">
            <Button type="click" variant="primary">Add A Movie</Button>
          </Link>
        ) : null}
        <div className="general-cards-container">
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
