import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getRecsByUser } from '../../api/recData';
import RecCard from '../../components/RecCard';

export default function AllRecommendations() {
  const [recs, setRecs] = useState([]);

  const { user } = useAuth();

  const updateRecs = () => {
    getRecsByUser(user.id).then(setRecs);
  };

  useEffect(() => {
    updateRecs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <h1>Your Recommendations</h1>
      {recs.recommendations
        ?.sort((a, b) => a.singleMovie.title.localeCompare(b.singleMovie.title))
        ?.map((single) => (
          <div key={single.singleMovie.id} className="recommended-group">
            <div>
              <h4>For viewers of <i>{single.singleMovie.title}</i></h4>
              <Link passHref href={`/movie/${single.singleMovie.id}`}>
                <Image src={single.singleMovie.image} alt="movie poster" style={{ width: 400, height: 600 }} />
              </Link>
            </div>
            <div className="all-recs">
              {single.recommendedMovies.map((rec) => <RecCard key={rec.movieId} movieObj={rec} singleMovieId={single.singleMovie.id} added manage onUpdate={updateRecs} />)};
            </div>
          </div>
        ))}
    </div>
  );
}
