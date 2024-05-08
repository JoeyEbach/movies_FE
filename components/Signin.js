/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="sign-in"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <Image src="/Logo.png" alt="logo" width="400" height="400" style={{ justifyContent: 'center' }} />
      <h1>Hi there!</h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" className="signin-btn" variant="dark" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
