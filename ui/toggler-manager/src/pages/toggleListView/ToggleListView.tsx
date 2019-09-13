import React from 'react';

// Components
import TogglerList from "../../components/togglerList/TogglerList"

const Home: React.FC = (props) => {
  return (
    <div className="Home">
      <Jumbotron fluid>
        <Container>
          <h1>Toggler Manager</h1>
          <p>
            Toggle Pattern implementation
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default Home;
