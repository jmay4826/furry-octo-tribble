import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import * as Papa from "papaparse";
import * as _ from "lodash";

interface IParams {
  section_id: string;
}

interface IProps extends RouteComponentProps<IParams> {
  section?: ISection;
}

class NewSection extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: ""
    };
  }

  public handleFile = (e: React.SyntheticEvent<HTMLInputElement>) => {
    // let data;
    if (e.currentTarget.files) {
      Papa.parse(e.currentTarget.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: result => {
          console.log(result.data);
          this.setState({ data: result.data });
        }
      });
    }
  };

  public handleChange = ({
    currentTarget: { name, value }
  }: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ [name]: value });

  public handleSubmit = () => {
    // const { username, password, email } = this.state;
    // if (this.props.section) {
    //   const {
    //     section: { section_id }
    //   } = this.props;
    //   Axios.post("/api/students", {
    //     email,
    //     password,
    //     section_id,
    //     username
    //   }).then(response =>
    //     this.props.history.push(
    //       `/sections/${this.props.match.params.section_id}`
    //     )
    //   );
    // }
    Axios.post("/api/sections/", this.state.data);
  };
  public render() {
    return (
      <React.Fragment>
        <div className="messages-header">Add a new section</div>
        <div
          className="messages-list"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <label htmlFor="upload">
            <FontAwesomeIcon icon={faFileUpload} size="3x" />
            <input
              type="file"
              name="upload"
              accept=".csv"
              onChange={this.handleFile}
            />
          </label>
          <p>Upload section and student information</p>
          <p>or</p>
          <p>Create an empty section</p>
          <label htmlFor="name">
            <input
              autoComplete="new-name"
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
              name="name"
              placeholder="name"
            />
          </label>
          <label htmlFor="description">
            <input
              autoComplete="new-description"
              onChange={this.handleChange}
              value={this.state.description}
              type="text"
              name="description"
              placeholder="description"
            />
          </label>
          <button>Clear</button>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </React.Fragment>
    );
  }
}

export { NewSection };
