import { CssBaseline } from "@material-ui/core";
import Axios from "axios";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Conversations } from "./components/Conversations";
import { InstructorDashboard } from "./components/InstructorDashboard";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { PrivateRoute } from "./PrivateRoute";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: "",
      loading: true,
      role: ""
    };
  }
  public async componentDidMount() {
    try {
      const { data: role } = await Axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      this.setState({ role, loading: false });
    } catch (e) {
      this.setState({ error: "An unknown error occurred" });
    }
  }
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <p>{this.state.error}</p>
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />

            <PrivateRoute
              path="/conversations/:conversation_id"
              component={Conversations}
              authenticated={!!this.state.role}
              loading={this.state.loading}
            />
            <PrivateRoute
              authenticated={!!this.state.role}
              path="/conversations"
              component={Conversations}
              loading={this.state.loading}
            />
            <PrivateRoute
              authenticated={this.state.role === "instructor"}
              exact={true}
              path="/instructor"
              component={InstructorDashboard}
              loading={this.state.loading}
            />

            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
