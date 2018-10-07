import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import * as React from "react";
import {
  // Redirect,
  RouteComponentProps
} from "react-router";

interface IState {
  email: string;
  password: string;
  error: string;
}

interface IProps extends RouteComponentProps {
  handleLogin: (token: string) => void;
}

const initialState = {
  email: "",
  error: "",
  password: ""
};

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public handleEmail = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: value });

  public handlePassword = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: value });

  public handleSubmit = async () => {
    try {
      const {
        data: { token }
      }: { data: { token: string } } = await Axios.post("/auth/login", {
        email: this.state.email,
        password: this.state.password
      });

      localStorage.setItem("token", token);
      this.props.handleLogin(token);
    } catch (err) {
      let error: string;
      if (err.response.status === 401) {
        error = "Incorrect email or password. Please try again.";
      } else {
        error = "An unknown error occurred. Please try again.";
      }
      this.setState({ error });
    }
  };

  public render() {
    return (
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
          placeholder="Email Address"
          onChange={this.handleEmail}
          name="email"
          type="text"
          value={this.state.email}
        />

        <TextField
          placeholder="Passsword"
          type="password"
          onChange={this.handlePassword}
          name="password"
          value={this.state.password}
        />

        <Button onClick={this.handleSubmit}>Submit</Button>
        <h3>Don't have a email? Ask your instructor</h3>
        {this.state.error && (
          <Typography color="error">{this.state.error}</Typography>
        )}
      </Paper>
    );
  }
}

export { Login };
