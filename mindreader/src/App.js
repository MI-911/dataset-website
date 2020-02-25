import React from 'react';
import './App.css';
import Navigation from './Navigation';
import About from './pages/About';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App" id="container">
        <Navigation />
        <Switch>
          <Route path="/downloads">
            downloads
          </Route>
          <Route path="/statistics">
            hej
          </Route>
          <Route path="/">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
