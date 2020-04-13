import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Releases from "./pages/Releases";
import About from "./pages/About";
import Statistics from "./pages/Statistics";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Blog from "./pages/Blog";
import Results from "./pages/Results";

function App() {
  return (
    <Router basename={"/dataset"}>
      <Navigation />
      <Container className="mt-3">
        <Switch>
          <Route path="/releases">
            <Releases />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/neo4j">
            <Blog />
          </Route>
          <Route path="/results">
            <Results />
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
