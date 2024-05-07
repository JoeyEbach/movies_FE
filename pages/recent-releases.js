import React, { useEffect, useState } from 'react';
import { getRecentMovies } from '../api/movieData';
import MovieCard from '../components/MovieCard';

export default function RecentReleases() {
  const [recentMovies, setRecentMovies] = useState([]);

  const getAllDaRecentMovies = () => {
    getRecentMovies().then(setRecentMovies);
  };

  useEffect(() => {
    getAllDaRecentMovies();
  }, []);

  return (
    <div className="general-cards-container">
      {recentMovies.map((rec) => (
        <MovieCard key={rec.id} movieObj={rec} onUpdate={getAllDaRecentMovies} />
      ))}
    </div>
  );
}
