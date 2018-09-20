import { default as axios } from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";

interface IState {
  email: string;
  error: string;
  password: string;
  username: string;
}

interface IProps extends RouteComponentProps {
  test: string;
}

const initialState = {
  email: "",
  error: "",
  password: "",
  username: ""
};

class SignUp extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public handleChange = ({
    target: { value, name }
  }: {
    target: { value: string; name: string };
  }) => this.setState({ [name]: value } as Pick<IState, keyof IState>);

  public submit = () =>
    axios
      .post("/api/signup", this.state)
      .then((response: { data: { token: string } }) => {
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        this.setState({ error: "Unsuccessful" });
      });

  public clear = () => {
    this.setState(initialState);
  };

  public render() {
    return (
      <div>
        <label htmlFor="username">
          Username
          <input
            onChange={this.handleChange}
            name="username"
            type="text"
            value={this.state.username}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            onChange={this.handleChange}
            name="email"
            type="text"
            value={this.state.email}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            onChange={this.handleChange}
            name="password"
            type="text"
            value={this.state.password}
          />
        </label>
        <p>{this.state.error}</p>
        <button onClick={this.submit}>Sign Up</button>
        <button onClick={this.clear}>Cancel</button>
      </div>
    );
  }
}

export { SignUp };
