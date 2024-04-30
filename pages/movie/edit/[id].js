import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleMovie } from '../../../api/movieData';
import MovieForm from '../../../components/forms/MovieForm';

export default function UpdateMovie() {
  const [currentMovie, setCurrentMovie] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleMovie(id)?.then(setCurrentMovie);
  }, [id]);

  return (
    <MovieForm movieObj={currentMovie} />
  );
}
