import React from 'react';

// Components
import { Jumbotron, Container } from "react-bootstrap";

const NotFoundView: React.FC = (props) => {
  return (
    <div className="About">
      <Jumbotron fluid>
        <Container>
          <h1>Not Found</h1>
          <h3>
            404 - Page Not Found
          </h3>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default NotFoundView;
