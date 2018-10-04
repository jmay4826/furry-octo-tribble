import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";

interface IParams {
  section_id: string;
}

interface IProps extends RouteComponentProps<IParams> {
  section?: ISection;
}

class NewStudent extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: ""
    };
  }

  public handleChange = ({
    currentTarget: { name, value }
  }: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ [name]: value });

  public handleSubmit = () => {
    const { username, password, email } = this.state;
    if (this.props.section) {
      const {
        section: { section_id }
      } = this.props;
      Axios.post("/api/students", {
        email,
        password,
        section_id,
        username
      }).then(response =>
        this.props.history.push(
          `/sections/${this.props.match.params.section_id}`
        )
      );
    }
  };
  public render() {
    return (
      <React.Fragment>
        <div className="messages-header">
          Add a new student to {this.props.section && this.props.section.name}
        </div>
        <div className="messages-list">
          <label htmlFor="username">
            <input
              autoComplete="new-username"
              onChange={this.handleChange}
              value={this.state.username}
              type="text"
              name="username"
              placeholder="Username"
            />
          </label>
          <label htmlFor="password">
            <input
              autoComplete="new-password"
              onChange={this.handleChange}
              value={this.state.password}
              type="text"
              name="password"
              placeholder="Password"
            />
          </label>
          <input
            onChange={this.handleChange}
            value={this.state.email}
            type="text"
            name="email"
            placeholder="Email"
          />
          <button>Clear</button>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </React.Fragment>
    );
  }
}

export { NewStudent };
