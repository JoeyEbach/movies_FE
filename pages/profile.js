/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { getSingleUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';
// import { getReviewsByUser } from '../api/reviewData';
// import { Button } from 'react-bootstrap';

export default function Profile() {
  const [singleUser, setSingleUser] = useState({});
  const { user } = useAuth();

  const getDetails = () => {
    getSingleUser(user.id).then(setSingleUser);
  };

  useEffect(() => {
    getDetails();
  });

  return (
    <div>
      <img src={singleUser.image} alt="profile" style={{ borderRadius: '50%', width: 250, height: 250 }} />
      <h1>Hello {singleUser.name}! </h1>
      <p>Email: {singleUser.email}</p>
      <p>Click the button below to logout!</p>
    </div>
  );
}
