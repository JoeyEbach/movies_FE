/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="sign-in">
      <Image src="/Logo.png" alt="logo" width="400" height="400" />
      <div className="signin-container">
        <div style={{ height: '150px' }} />
        <h1>Hi there!</h1>
        <p>Click the button below to login!</p>
        <Button type="button" size="lg" className="signin-btn" variant="dark" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
