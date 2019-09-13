import React from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
      </Router>
    </div>
  );
}

export default App;
