import React from 'react';

// Components
import { Jumbotron, Container } from "react-bootstrap";

const About: React.FC = (props) => {
  return (
    <div className="About">
      <Jumbotron fluid>
        <Container>
          <h1>About</h1>
          <p>
            Toggle Pattern implementation
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default About;
