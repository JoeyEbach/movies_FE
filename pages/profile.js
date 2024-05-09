/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';
import { getReviewsByUser } from '../api/reviewData';
import ReviewCard from '../components/ReviewCard';
import MovieCard from '../components/MovieCard';
import { getWatchlistMovies } from '../api/movieData';

export default function Profile() {
  const [singleUser, setSingleUser] = useState({});
  const [myReviews, setMyReviews] = useState([]);
  const [myWatchlist, setWatchlist] = useState({});
  const { user } = useAuth();

  const getWatchlist = () => {
    getWatchlistMovies(user.id).then(setWatchlist);
  };

  const getUserDetails = () => {
    getSingleUser(user.id).then(setSingleUser);
  };

  const getMyReviews = () => {
    const userId = user.id;
    getReviewsByUser(userId).then(setMyReviews);
  };

  useEffect(() => {
    getUserDetails();
    getMyReviews();
    getWatchlist();
  }, [user]);

  return (
    <>
      <div className="profile-container">
        <img src={singleUser.image} alt="profile" style={{ borderRadius: '50%', width: 250, height: 250 }} />
        <h1>Hello {singleUser.name}! </h1>
        <p>Email: {singleUser.email}</p>
        <Link href="/profile/all-recommendations" passHref>
          <Button variant="primary">View/Manage Recommendations</Button>
        </Link>
      </div>
      <div className="user-items">
        {/* Getting the Watchlist cards */}
        <div className="myWatchlist">
          <h2>Your Watchlist:</h2>
          <div className="watchlist-container">
            {myWatchlist.movies?.map((list) => (
              <MovieCard key={list.id} movieObj={list} onUpdate={getWatchlist} />
            ))}
          </div>
        </div>
        {/* Getting the review cards */}
        <div className="myReviews">
          <h2>Your Reviews:</h2>
          {myReviews.map((r) => (
            <div className="profile-reviews-container" key={r.id}>
              <div>
                <img src={r.movieImage} alt="movie poster" style={{ width: 80, height: 120 }} />
              </div>
              <div>
                <h6>{r.movieName}</h6>
                <ReviewCard key={r.id} reviewObj={r} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
