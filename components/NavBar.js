/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container className="signout-container">
        <Link passHref href="/">
          <Navbar.Brand><img src="/Logo.png" alt="logo" width="100" height="100" /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{ width: '100%' }}>
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <div className="tabs">
              <Link passHref href="/">
                <Nav.Link style={{ color: '#b3b3b3' }}>Home</Nav.Link>
              </Link>
              <Link passHref href="/recent-releases">
                <Nav.Link style={{ color: '#b3b3b3' }}>Recent</Nav.Link>
              </Link>
              <Link passHref href="/all-movies">
                <Nav.Link style={{ color: '#b3b3b3' }}>All</Nav.Link>
              </Link>
              <Link passHref href="/profile">
                <Nav.Link style={{ color: '#b3b3b3' }}>Profile</Nav.Link>
              </Link>
            </div>
            <div style={{ marginLeft: '10px', paddingRight: '40px', width: '100%' }}>
              <SearchBar />
            </div>
            <Nav style={{ width: '25%' }}>
              <Button variant="outline-secondary" onClick={signOut} className="signOutButton">
                Sign Out
              </Button>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
