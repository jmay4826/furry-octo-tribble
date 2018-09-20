import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" render={() => <h1>Home</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
