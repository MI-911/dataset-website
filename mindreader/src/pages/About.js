import React from 'react';
import { Jumbotron, Container} from 'react-bootstrap';

const About = () => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>MindReader</h1>
        <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
        </p>
      </Container>
    </Jumbotron>
  );
};

export default About;