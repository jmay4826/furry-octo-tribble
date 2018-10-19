import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { UserContext } from "src/App";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "./Input";
import { JoinSection } from "./JoinSection";

interface IProps extends RouteComponentProps {
  prop?: void;
}

const validationSchema = Yup.object().shape({
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match.")
    .label("Confirm password"),
  email: Yup.string()
    .email()
    .label("Email"),
  first_name: Yup.string()
    .min(1)
    .label("First Name"),
  last_name: Yup.string()
    .min(1)
    .label("Last Name"),
  password: Yup.string()
    .min(8)
    .label("Password")
});

export class Settings extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      changePassword: false,
      sections: []
    };
  }

  public async componentDidMount() {
    const {
      data: { sections }
    } = await Axios.get("/api/sections", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    this.setState({ sections });
  }

  public handleSubmit = async (values: any) => {
    try {
      await Axios.put(`/auth/users/${values.id}`, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      this.setState({ userInformationSuccess: "Updated successfully" });
      setTimeout(() => this.setState({ userInformationSuccess: "" }), 5000);
    } catch (e) {
      this.setState({ userInformationError: "Error updating information." });
    }
  };

  public updatePassword = async (values: any) => {
    try {
      await Axios.put(`/auth/users/${values.id}/password`, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      this.setState({ passwordSuccess: "Updated successfully" });
      setTimeout(() => this.setState({ passwordSuccess: "" }), 5000);
    } catch (e) {
      this.setState({ passwordError: "Error updating password." });
    }
  };

  public render() {
    return (
      <UserContext.Consumer>
        {({ user }) => {
          return !user ? null : (
            <div className="messages-container">
              <div className="messages-header">
                {user.first_name}
                's Settings
              </div>
              <div className="messages-list">
                <div
                  className="conversation-preview"
                  style={{ display: "flex", alignItems: "space-between" }}
                >
                  <Formik
                    initialValues={{
                      email: user.email,
                      first_name: user.first_name,
                      id: user.id,
                      last_name: user.last_name
                    }}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit}
                  >
                    {({ errors, touched, values }: any) => {
                      return (
                        <Form style={{ flexBasis: "50%", textAlign: "center" }}>
                          <h3>User Information</h3>
                          <input type="hidden" value={user.id} name="id" />

                          <Field
                            component={Input}
                            label="First Name"
                            name="first_name"
                            type="text"
                            error={errors.first_name}
                          />

                          <Field
                            component={Input}
                            label="Last Name"
                            name="last_name"
                            type="text"
                            error={errors.last_name}
                          />
                          <Field
                            component={Input}
                            label="Email Address"
                            name="email"
                            type="email"
                            error={errors.email}
                          />

                          <button type="submit">Update User Information</button>
                          <p
                            style={{
                              visibility:
                                this.state.userInformationSuccess ||
                                this.state.userInformationError
                                  ? "visible"
                                  : "hidden"
                            }}
                          >
                            {this.state.userInformationSuccess ||
                              this.state.userInformationError}
                          </p>
                        </Form>
                      );
                    }}
                  </Formik>

                  <Formik
                    onSubmit={this.updatePassword}
                    initialValues={{
                      confirmPassword: "",
                      currentPassword: "",
                      id: user.id,
                      newPassword: ""
                    }}
                    validationSchema={Yup.object().shape({
                      confirmPassword: Yup.string()
                        .oneOf(
                          [Yup.ref("newPassword")],
                          "Passwords must match."
                        )
                        .required()
                        .label("Confirm Password"),
                      currentPassword: Yup.string()
                        .min(8)
                        .required()
                        .label("Current Password"),
                      newPassword: Yup.string()
                        .min(8)
                        .required()
                        .label("New Password")
                    })}
                  >
                    {({ values, errors }: any) => {
                      return (
                        <Form
                          style={{
                            flexBasis: "50%",
                            textAlign: "center"
                          }}
                        >
                          <h3>Change Password</h3>
                          <input type="hidden" value={user.id} name="id" />
                          <Field
                            name="currentPassword"
                            component={Input}
                            error={errors.currentPassword}
                            label="Current Password"
                          />
                          <Field
                            name="newPassword"
                            component={Input}
                            error={errors.newPassword}
                            label="New Password"
                          />
                          <Field
                            name="confirmPassword"
                            component={Input}
                            error={errors.confirmPassword}
                            label="Confirm Password"
                          />
                          <button type="submit">Update Password</button>
                          <p
                            style={{
                              visibility:
                                this.state.passwordSuccess ||
                                this.state.passwordError
                                  ? "visible"
                                  : "hidden"
                            }}
                          >
                            {this.state.passwordSuccess ||
                              this.state.passwordError}
                          </p>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
                <div
                  className="conversation-preview"
                  style={{ display: "flex" }}
                >
                  <div style={{ flexBasis: "50%" }}>
                    <h3>Current Sections</h3>
                    <ul>
                      {this.state.sections.map((section: ISection) => (
                        <li key={section.section_id}>{section.section_id}</li>
                      ))}
                      {!this.state.sections.length && (
                        <li>Not enrolled in any sections yet.</li>
                      )}
                    </ul>
                  </div>
                  <div style={{ flexBasis: "50%" }}>
                    <JoinSection {...this.props} />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}
