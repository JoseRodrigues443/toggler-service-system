import React from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Route } from "react-router-dom";
// boostrap
import { Container } from 'react-bootstrap'

// Components
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import ToggleListView from "./pages/toggleViews/toggleListView/ToggleListView";
import ToggleEditView from "./pages/toggleViews/toggleEditView/ToggleEditView";
import ToggleCreateView from "./pages/toggleViews/toggleCreateView/ToggleCreateView";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/toggles" component={ToggleListView} />
          <Route path="/toggle/:id/edit" component={ToggleEditView} />
          <Route path="/toggles/create" component={ToggleCreateView} />
        </Container>
      </Router>
    </div>
  );
}

export default App;
