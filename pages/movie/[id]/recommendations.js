import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllMovies, getSingleMovie } from '../../../api/movieData';
import RecCard from '../../../components/RecCard';

export default function Recommendations() {
  const [allMovies, setAllMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const router = useRouter();

  const getAllTheMovies = () => {
    getAllMovies().then(setAllMovies);
  };

  useEffect(() => {
    getAllTheMovies();
  }, []);

  useEffect(() => {
    getSingleMovie(Number(router.query.id)).then(setMovie);
  }, [router]);

  return (
    <>
      <h1>Manage Recommendations for {movie.title}</h1>
      <h3>Recommended</h3>
      <div className="cards">
        {allMovies
          .filter((m) => m.id !== movie.id)
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((auth) => (
            <RecCard key={auth.id} movieObj={auth} added="true" manage="true" onUpdate={getAllTheMovies} />
          ))}
      </div>
      <h3>Add</h3>
      <div className="cards">
        {allMovies
          .filter((m) => m.id !== movie.id)
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((auth) => (
            <RecCard key={auth.id} movieObj={auth} manage="true" onUpdate={getAllTheMovies} />
          ))}
      </div>
    </>
  );
}
