import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";

interface IState {
  username: string;
  password: string;
  error: string;
}

const initialState = {
  error: "",
  password: "",
  username: ""
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
        this.props.history.push("/dashboard");
      })
      .catch(err => this.setState({ error: "Unsuccessful" }));
  };

  public render() {
    return (
      <div>
        <label htmlFor="username">
          <input
            placeholder="Username"
            onChange={this.handleChange}
            name="username"
            type="text"
            value={this.state.username}
          />
        </label>
        <label htmlFor="password">
          <input
            placeholder="Passsword"
            onChange={this.handleChange}
            name="password"
            type="text"
            value={this.state.password}
          />
        </label>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export { Login };
