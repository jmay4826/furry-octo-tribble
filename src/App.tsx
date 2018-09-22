import { CssBaseline } from "@material-ui/core";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Conversations } from "./components/Conversations";
import { Login } from "./components/Login";
import { Messages } from "./components/Messages";
import { SignUp } from "./components/SignUp";

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/conversations" component={Conversations} />
            <Route
              path="/conversations/:conversation_id"
              component={Messages}
            />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
