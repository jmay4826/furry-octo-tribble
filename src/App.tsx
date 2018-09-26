import Axios from "axios";
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps
} from "react-router-dom";
import "./App.css";
import { Conversations } from "./components/Conversations";
import { InstructorDashboard } from "./components/InstructorDashboard";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { PrivateRoute } from "./PrivateRoute";
import { Logout } from "./components/Logout";

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
    const token = localStorage.getItem("token");
    if (token) {
      this.checkAuth(token);
    } else {
      this.setState({ loading: false });
    }
  }

  public checkAuth = async (token: string) => {
    try {
      const { data: role } = await Axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.setState({ role, loading: false });
    } catch (e) {
      if (e.response.status !== 401) {
        this.setState({ error: "An unknown error occurred" });
      }
    }
  };

  public loginComponent = (props: RouteComponentProps) => (
    <Login {...props} handleLogin={this.handleLogin} />
  );
  public logoutComponent = () => <Logout logout={this.handleLogout} />;

  public handleLogin = (token: string) => {
    this.setState({ loading: true });
    this.checkAuth(token);
  };

  public handleLogout = () => {
    this.setState({ error: "", role: "" });
  };

  public render() {
    return (
      <React.Fragment>
        {!!this.state.error && <p>{this.state.error}</p>}

        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" render={this.loginComponent} />
            <Route path="/logout" render={this.logoutComponent} />

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
