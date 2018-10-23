import * as React from "react";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "./Input";
import { SectionInput } from "./SectionInput";
import { User } from "./User";
import { MainContentStyles } from "../styles/MainContentStyles";
import { CardStyles } from "../styles/CardStyles";
import { UpdatePassword } from "./UpdatePassword";
import { UpdateUserInfo } from "./UpdateUserInfo";

export class Settings extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sections: []
    };
  }

  public handleSubmit = async (values: any) => {
    this.setState({ userInformationSuccess: "Updated successfully" });
    setTimeout(() => this.setState({ userInformationSuccess: "" }), 5000);

    this.setState({ userInformationError: "Error updating information." });
  };

  public updatePassword = async (values: any) => {
    this.setState({ passwordSuccess: "Updated successfully" });
    setTimeout(() => this.setState({ passwordSuccess: "" }), 5000);

    this.setState({ passwordError: "Error updating password." });
  };

  public render() {
    return (
      <User>
        {({ loading, error, data }) => {
          return !data ? null : (
            <div className="main-content-container">
              <div className="main-content-header">
                {data.me.first_name}
                's Settings
              </div>
              <div className="main-content">
                <div
                  className="card"
                  style={{ display: "flex", alignItems: "space-between" }}
                >
                  <UpdateUserInfo user={data.me} />

                  <UpdatePassword user={data.me} />
                </div>
                <div className="card" style={{ display: "flex" }}>
                  <div style={{ flexBasis: "50%" }}>
                    <h3>Current Sections</h3>
                    <ul>
                      {data.me.user_sections.map(({ id }: { id: number }) => (
                        <li key={id}>{id}</li>
                      ))}
                      {!data.me.user_sections.length && (
                        <li>Not enrolled in any sections yet.</li>
                      )}
                    </ul>
                  </div>
                  <div style={{ flexBasis: "50%" }}>
                    <div style={{ textAlign: "center" }}>
                      <h3>Request to join a new section</h3>
                      <SectionInput />
                      <button
                      // disabled={!this.state.valid}
                      // onClick={this.handleSubmit}
                      >
                        Submit
                      </button>
                      {/* {this.state.success && "Added to section"} */}
                    </div>
                  </div>
                </div>
              </div>
              <style jsx>{MainContentStyles}</style>
              <style jsx>{CardStyles}</style>
            </div>
          );
        }}
      </User>
    );
  }
}
