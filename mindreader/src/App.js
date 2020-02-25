import React from 'react';
import './App.css';
import Navigation from './Navigation';
import Releases from './pages/Releases';
import About from './pages/About';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';


function App() {
  return (
    <Router>
        <Navigation />
        <Container className="mt-3">
          <Switch>
            <Route path="/releases">
              <Releases />
            </Route>
            <Route path="/statistics">
              hej
            </Route>
            <Route path="/">
              <About />
            </Route>
          </Switch>
        </Container>
    </Router>
  );
}

export default App;
