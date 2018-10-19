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
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { NavbarSignedIn } from "./components/NavbarSignedIn";
import { NavBarSignedOut } from "./components/NavBarSignedOut";
import { Privacy } from "./components/Privacy";
import { PrivateRoute } from "./components/PrivateRoute";
import { Sections } from "./components/Sections";
import { Settings } from "./components/Settings";
import { SignUp } from "./components/SignUp";

export const UserContext = React.createContext({
  setUser: (user: IDecodedUser) => {
    /**/
  },
  user: {} as IDecodedUser
});

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
            <div className="container">
              {this.state.user && (
                <NavbarSignedIn role={this.state.user.role} />
              )}
              <UserContext.Provider
                value={{
                  setUser: user => this.setState({ user }),
                  user: this.state.user as IDecodedUser
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1
                  }}
                >
                  {!this.state.user && <NavBarSignedOut />}
                  {!this.state.user && (
                    <Route path="/join" component={SignUp} />
                  )}
                  <Route path="/signup" component={SignUp} />
                  <Route path="/login" render={this.loginComponent} />
                  <Route path="/logout" render={this.logoutComponent} />
                  <Route path="/privacy" component={Privacy} />

                  {this.state.user && (
                    <div className="conversations-container">
                      <Route path="/join" component={Settings} />
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
                      <PrivateRoute
                        authenticated={!!this.state.user}
                        path="/settings"
                        component={Settings}
                      />
                    </div>
                  )}
                  <Route
                    exact={true}
                    path="/"
                    render={
                      this.state.loading
                        ? props => "Loading"
                        : props =>
                            this.state.user ? (
                              <Redirect
                                to={
                                  this.state.user &&
                                  this.state.user.role === "instructor"
                                    ? "/sections"
                                    : "/login"
                                }
                              />
                            ) : (
                              <Home />
                            )
                    }
                  />
                </div>
              </UserContext.Provider>
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
