/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import searchMoviesByTitle from '../../api/searchData';
import MovieCard from '../../components/MovieCard';

export default function Search() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllPosts = () => {
    searchMoviesByTitle(searchInput).then(setFilteredPosts);
  };

  useEffect(() => {
    searchAllPosts();
    return () => {
      setFilteredPosts([]);
    };
  }, [searchInput]);

  return (
    <>
      <div className="general-cards-container">
        {filteredPosts.length === 0 ? (<h1>No Results Found</h1>) : (filteredPosts.map((movie) => <MovieCard key={movie.id} movieObj={movie} />))}
      </div>
    </>
  );
}
