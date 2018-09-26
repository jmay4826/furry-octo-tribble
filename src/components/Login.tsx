import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";

interface IState {
  username: string;
  password: string;
  error: string;
  loggedIn: boolean;
}

interface IProps extends RouteComponentProps {
  handleLogin: (token: string) => void;
}

const initialState = {
  error: "",
  loggedIn: false,
  password: "",
  username: ""
};

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public handleUsername = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => this.setState({ username: value });

  public handlePassword = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: value });

  public handleSubmit = async () => {
    try {
      const {
        data: { token }
      }: { data: { token: string } } = await Axios.post("/auth/login", {
        password: this.state.password,
        username: this.state.username
      });

      localStorage.setItem("token", token);
      this.props.handleLogin(token);
      this.setState({ loggedIn: true });
    } catch (err) {
      let error: string;
      if (err.response.status === 401) {
        error = "Incorrect username or password. Please try again.";
      } else {
        error = "An unknown error occurred. Please try again.";
      }
      this.setState({ error });
    }
  };

  public render() {
    return this.state.loggedIn ? (
      <Redirect to="/conversations" push={true} />
    ) : (
      <Paper
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          margin: "20%"
        }}
      >
        <h2>Login</h2>
        <TextField
          placeholder="Username"
          onChange={this.handleUsername}
          name="username"
          type="text"
          value={this.state.username}
        />

        <TextField
          placeholder="Passsword"
          type="pasword"
          onChange={this.handlePassword}
          name="password"
          value={this.state.password}
        />

        <Button onClick={this.handleSubmit}>Submit</Button>
        <h3>Don't have a username? Ask your instructor</h3>
        {this.state.error && (
          <Typography color="error">{this.state.error}</Typography>
        )}
      </Paper>
    );
  }
}

export { Login };
