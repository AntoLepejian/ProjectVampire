import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "./pages/Home";
import Batmobile from "./pages/Batmobile";
import Donor from "./pages/Donor";
import "./App.css";

function App() {
  return (
    <Router>
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
