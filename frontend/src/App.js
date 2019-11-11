import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "./pages/Home";
import Batmobile from "./pages/Batmobile";
import Donor from "./pages/Donor";
import Navbar from "react-bootstrap/Navbar";
import vampireImage from "./vampire-icon.png";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={vampireImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {"  Project Vampire"}
        </Navbar.Brand>
      </Navbar>
      <Route
        render={({ location, history }) => (
          <React.Fragment>
            <Switch>
              <Route
                path="/"
                exact
                component={props => (
                  <Home location={location} history={history} />
                )}
              />
              <Route
                path="/batmobile"
                exact
                component={props => <Batmobile />}
              />
              <Route path="/donor" exact component={props => <Donor />} />
              <Route
                path="/hospital"
                exact
                component={props => (
                  <div>
                    <p>hospital</p>
                  </div>
                )}
              />
            </Switch>
          </React.Fragment>
        )}
      />
    </Router>
  );
}

export default App;
