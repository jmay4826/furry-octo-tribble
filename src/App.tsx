import Axios from "axios";
import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps
} from "react-router-dom";
import "./App.css";
import { Conversations } from "./components/Conversations";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Navbar } from "./components/Navbar";
import { Privacy } from "./components/Privacy";
import { PrivateRoute } from "./components/PrivateRoute";
import { Sections } from "./components/Sections";
import { SignUp } from "./components/SignUp";

export const UserContext = React.createContext({} as IDecodedUser);

interface IState {
  user?: IDecodedUser;
  error: string;
  loading: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: "",
      loading: true,
      user: undefined
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
      const { data: user } = await Axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.setState({ user, loading: false });
    } catch (e) {
      if (e.response.status !== 401) {
        this.setState({ error: "An unknown error occurred", loading: false });
      } else {
        this.setState({ loading: false });
      }
    }
  };

  public loginComponent = (props: RouteComponentProps) =>
    this.state.user ? (
      <Redirect
        push={true}
        to={
          this.state.user.role === "instructor" ? "/sections" : "/conversations"
        }
      />
    ) : (
      <Login {...props} handleLogin={this.handleLogin} />
    );

  public logoutComponent = () => <Logout logout={this.handleLogout} />;

  public handleLogin = (token: string) => {
    this.setState({ loading: true });
    this.checkAuth(token);
  };

  public handleLogout = () => {
    this.setState({ error: "", user: undefined });
  };

  public render() {
    return (
      <React.Fragment>
        {!!this.state.error && <p>{this.state.error}</p>}

        <Router>
          <div>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" render={this.loginComponent} />
            <Route path="/logout" render={this.logoutComponent} />
            <Route path="/privacy" component={Privacy} />
            {this.state.user && (
              <UserContext.Provider value={this.state.user}>
                <div className="container">
                  <Navbar role={this.state.user.role} />
                  <div style={{ flexGrow: 1 }}>
                    <div className="conversations-container">
                      <PrivateRoute
                        path="/conversations/:conversation_id?"
                        component={Conversations}
                        authenticated={!!this.state.user.role}
                      />
                      <PrivateRoute
                        authenticated={this.state.user.role === "instructor"}
                        path="/sections/:section_id?/(students)?/:student_id?"
                        component={Sections}
                      />
                    </div>
                  </div>
                </div>
              </UserContext.Provider>
            )}

            <Route
              exact={true}
              path="/"
              render={
                this.state.loading
                  ? props => "Loading"
                  : props => (
                      <Redirect
                        to={
                          this.state.user &&
                          this.state.user.role === "instructor"
                            ? "/sections"
                            : "/login"
                        }
                      />
                    )
              }
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
