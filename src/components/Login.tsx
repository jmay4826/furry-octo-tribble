import Axios from "axios";
import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { Paper, TextField, Button } from "@material-ui/core";

interface IState {
  username: string;
  password: string;
  error: string;
  loggedIn: boolean | string;
}

const initialState = {
  error: "",
  password: "",
  username: "",
  loggedIn: false
};

class Login extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = initialState;
  }

  public handleChange = ({
    target: { value, name }
  }: {
    target: { value: string; name: string };
  }) => this.setState({ [name]: value } as Pick<IState, keyof IState>);

  public handleSubmit = () => {
    Axios.post("/auth/login", {
      password: this.state.password,
      username: this.state.username
    })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        this.setState({ loggedIn: true });
      })
      .catch(err => {
        let error;
        if (err.response.status === 401) {
          error = "Incorrect username or password. Please try again.";
        } else {
          error = "An unknown error occurred. Please try again.";
        }
        this.setState({ error });
      });
  };

  public render() {
    return this.state.loggedIn ? (
      <Redirect to="/conversations" push={true} />
    ) : (
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20%"
        }}
      >
        <h2>Login</h2>
        <TextField
          placeholder="Username"
          onChange={this.handleChange}
          name="username"
          type="text"
          value={this.state.username}
        />

        <TextField
          placeholder="Passsword"
          onChange={this.handleChange}
          name="password"
          type="text"
          value={this.state.password}
        />

        <Button onClick={this.handleSubmit}>Submit</Button>
        <h3>Don't have a username? Ask your instructor</h3>
        {this.state.error && <p className="error">{this.state.error}</p>}
      </Paper>
    );
  }
}

export { Login };
