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
    if (e.currentTarget.files) {
      Papa.parse(e.currentTarget.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: result => {
          const data = _.groupBy(result.data, "section");
          this.setState({ data });
        }
      });
    }
  };

  public handleChange = ({
    currentTarget: { name, value }
  }: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ [name]: value });

  public handleSubmit = () => {
    Axios.post("/api/sections/", this.state.data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  public render() {
    return (
      <React.Fragment>
        <div className="messages-header">Add a new section</div>
        <div
          className="messages-list"
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column"
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
