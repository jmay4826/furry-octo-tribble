import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { groupBy } from "lodash";
import { parse } from "papaparse";
import * as React from "react";

export class BulkSectionUpload extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: undefined,
      sections: [],
      students: 0
    };
  }
  public handleFile = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      parse(e.currentTarget.files[0], {
        complete: result => {
          const data = groupBy(result.data, "Section");
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

  public render() {
    return (
      <React.Fragment>
        <div className="error">
          Caution: Providing student information to a third party may require
          written consent or other privacy-related measures. We recommend that
          you add a blank section and invite students to join on their own
          instead. By proceeding, you are indicating that you have reviewed any
          applicable guidelines in your area and taken any necessary steps for
          protecting student data.
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>You can upload a CSV file with this format:</h3>
          <p style={{ alignSelf: "center" }}>
            <strong>First Name | Last Name | Email | Password | Section</strong>
          </p>
        </div>
        <label
          htmlFor="upload"
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            margin: "20px"
          }}
        >
          <FontAwesomeIcon icon={faFileUpload} size="3x" />
          <input
            type="file"
            name="upload"
            accept=".csv"
            onChange={this.handleFile}
            style={{ width: "auto", margin: "10px" }}
          />
        </label>
        {this.state.data && (
          <div className="conversation-preview selected">
            <div className="conversation-preview-users">Ready to upload...</div>
            <div
              className="conversation-preview-content"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <div>
                <p>{this.state.sections.length} sections</p>
                <p>{this.state.students} students</p>
              </div>

              <button>Submit</button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
