import React from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Route } from "react-router-dom";
// boostrap
import { Container } from 'react-bootstrap'

// Components
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
// Toggle Views
import ToggleListView from "./pages/toggleViews/toggleListView/ToggleListView";
import ToggleEditView from "./pages/toggleViews/toggleEditView/ToggleEditView";
import ToggleCreateView from "./pages/toggleViews/toggleCreateView/ToggleCreateView";
// Service Views
import ServiceListView from "./pages/servicesViews/list/ServiceListView";
import ServiceEditView from "./pages/servicesViews/edit/ServiceEditView";
import ServiceCreateView from "./pages/servicesViews/create/ServiceCreateView";
import ServiceRelations from "./pages/servicesViews/relations/ServiceRelations";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Container>
          {/* Base Page */}
          <Route exact path="/" component={Home} />

          {/* Toggle Pages */}
          <Route exact path="/toggles" component={ToggleListView} />
          <Route path="/toggle/:id/edit" component={ToggleEditView} />
          <Route path="/toggles/create" component={ToggleCreateView} />

          {/* Services Pages */}
          <Route exact path="/services" component={ServiceListView} />
          <Route path="/service/:id/edit" component={ServiceEditView} />
          <Route path="/services/create" component={ServiceCreateView} />
          <Route path="/services/:id/relations" component={ServiceRelations} />
          
        </Container>
      </Router>
    </div>
  );
}

export default App;
