import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import * as _ from "lodash";
import * as Papa from "papaparse";
import * as React from "react";
import { RouteComponentProps } from "react-router";

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
      data: undefined,
      sections: [],
      students: 0,
      bulk: false
    };
  }

  public handleFile = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      Papa.parse(e.currentTarget.files[0], {
        complete: result => {
          const data = _.groupBy(result.data, "section");
          const sections = Object.keys(data);
          const students = sections
            .map(section => data[section].length)
            .reduce((acc, cur) => acc + cur);
          this.setState({ data, sections, students });
        },
        header: true,
        skipEmptyLines: true
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
          {!this.state.bulk ? (
            <React.Fragment>
              <p>Create an empty section</p>
              <label htmlFor="name">
                <input
                  autoComplete="new-name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  type="text"
                  name="name"
                  placeholder="Name (must be unique)"
                />
              </label>
              <label htmlFor="description">
                <input
                  autoComplete="new-description"
                  onChange={this.handleChange}
                  value={this.state.description}
                  type="text"
                  name="description"
                  placeholder="Section Description"
                />
              </label>
              <button>Clear</button>
              <button onClick={this.handleSubmit}>Submit</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
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
              <p>{this.state.sections.length} sections</p>
              <p>{this.state.students} students total</p>
              <p>
                You can upload a CSV file with student information. Make sure
                the columns are:
              </p>
              <p>firstname | lastname | email | password | section </p>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export { NewSection };
