import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";

interface IParams {
  section_id: string;
}

interface IProps extends RouteComponentProps<IParams> {
  section?: ISection;
}

interface IState {
  first_name: string;
  last_name: string;
  display_name: string;
  password: string;
  email: string;
}

const initialState = {
  display_name: "",
  email: "",
  first_name: "",
  last_name: "",
  password: ""
};

class NewStudent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public handleChange = <T extends keyof IState>({
    currentTarget: { name, value }
  }: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ [name]: value } as { [P in T]: IState[P] });

  public handleSubmit = async () => {
    const { first_name, last_name, display_name, password, email } = this.state;
    const { section_id } = this.props.match.params;
    await Axios.post(
      "/api/students",
      {
        display_name,
        email,
        first_name,
        last_name,
        password,
        section_id
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    );
    this.props.history.push(`/sections/${this.props.match.params.section_id}`);
  };
  public render() {
    return (
      <React.Fragment>
        <div className="messages-header">
          Add a new student to{" "}
          {this.props.section && this.props.section.section_id}
        </div>
        <div className="messages-list">
          <label htmlFor="first_name">
            <input
              autoComplete="new-username"
              onChange={this.handleChange}
              value={this.state.first_name}
              type="text"
              name="first_name"
              placeholder="First Name"
            />
          </label>
          <label htmlFor="last_name">
            <input
              autoComplete="new-username"
              onChange={this.handleChange}
              value={this.state.last_name}
              type="text"
              name="last_name"
              placeholder="Last Name"
            />
          </label>
          <label htmlFor="display_name">
            <input
              autoComplete="new-username"
              onChange={this.handleChange}
              value={this.state.display_name || this.state.first_name}
              type="text"
              name="display_name"
              placeholder={"Display Name"}
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
          <button onClick={this.props.history.goBack}>Cancel</button>
          <button onClick={this.handleSubmit}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export { NewStudent };
