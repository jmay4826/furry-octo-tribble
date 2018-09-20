import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { SignUp } from "./components/SignUp";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" render={() => <h1>Login</h1>} />
          <Route path="/dashboard" render={() => <h1>Dashboard</h1>} />
          <Route path="/" render={() => <h1>Home</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
