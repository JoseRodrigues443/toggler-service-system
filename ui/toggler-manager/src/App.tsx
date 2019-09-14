import React from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Route } from "react-router-dom";
// boostrap
import { Container } from 'react-bootstrap'

// Components
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import ToggleListView from "./pages/toggleListView/ToggleListView";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/toggles" component={ToggleListView} />
        </Container>
      </Router>
    </div>
  );
}

export default App;
