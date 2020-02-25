import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
  return (
    <Navbar className="justify-content-center" bg="primary" variant="dark">
      <LinkContainer to="/#"><Navbar.Brand>MindReader</Navbar.Brand></LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to="/#"><Nav.Link>Home</Nav.Link></LinkContainer>
        <LinkContainer to="/downloads"><Nav.Link>Downloads</Nav.Link></LinkContainer>
        <LinkContainer to="/statistics"><Nav.Link>Statistics</Nav.Link></LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default Navigation;