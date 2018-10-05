import { default as axios } from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";

interface IState {
  first_name: string;
  last_name: string;
  email: string;
  error: string;
  password: string;
  confirm_password: string;
}

interface IProps extends RouteComponentProps {
  test: string;
}

const initialState: IState = {
  confirm_password: "",
  email: "",
  error: "",
  first_name: "",
  last_name: "",
  password: ""
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
      .post("/auth/signup", this.state)
      .then((response: { data: { token: string } }) => {
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/sections");
      })
      .catch(err => {
        this.setState({ error: "Unsuccessful" });
      });

  public clear = () => {
    this.setState(initialState);
  };

  public render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "50vw",
          margin: "0 auto"
        }}
      >
        <h3>
          This form is for instructors <strong>only</strong>. Student accounts
          must be created by instructors.
        </h3>
        <input
          onChange={this.handleChange}
          placeholder="First Name"
          name="first_name"
          type="text"
          value={this.state.first_name}
        />
        <input
          onChange={this.handleChange}
          placeholder="Last Name"
          name="last_name"
          type="text"
          value={this.state.last_name}
        />
        <input
          placeholder="Email Address"
          onChange={this.handleChange}
          name="email"
          type="text"
          value={this.state.email}
        />
        <input
          placeholder="Password"
          onChange={this.handleChange}
          name="password"
          type="password"
          value={this.state.password}
        />
        <input
          placeholder="Confirm Password"
          onChange={this.handleChange}
          name="confirm_password"
          type="password"
          value={this.state.confirm_password}
        />

        <p>{this.state.error}</p>
        <button onClick={this.submit}>Sign Up</button>
        <button onClick={this.clear}>Cancel</button>
      </div>
    );
  }
}

export { SignUp };
