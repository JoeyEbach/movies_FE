/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getSingleUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';
import { getReviewsByUser } from '../api/reviewData';
import ReviewCard from '../components/ReviewCard';

export default function Profile() {
  const [singleUser, setSingleUser] = useState({});
  const [myReviews, setMyReviews] = useState([]);
  const { user } = useAuth();

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
  }, [user]);

  return (
    <>
      <div>
        <img src={singleUser.image} alt="profile" style={{ borderRadius: '50%', width: 250, height: 250 }} />
        <h1>Hello {singleUser.name}! </h1>
        <p>Email: {singleUser.email}</p>
      </div>
      <div>
        {myReviews.map((r) => (
          <div className="profile-reviews-container">
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
    </>
  );
}
