import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as debounce from "p-debounce";
import * as queryString from "query-string";
import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { CSSTransition } from "react-transition-group";
import { UserContext } from "src/App";
import * as Yup from "yup";
import { Input } from "./Input";

class SignUp extends React.Component<RouteComponentProps, any> {
  public query = queryString.parse(this.props.location.search);
  public initialValues = {
    confirm_password: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    role: "student",
    section_id: this.query.section_id || ""
  };

  public validationSchema = Yup.object().shape({
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match.")
      .required(),
    email: Yup.string().email(),
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    password: Yup.string()
      .min(8)
      .required(),
    role: Yup.string().oneOf(
      ["student", "instructor"],
      "Please choose a student or instructor account"
    ),
    section_id: Yup.string().test(
      "section_id",
      "Could not find section.",
      async value => (!value ? true : await this.debouncedSection(value))
    )
  });

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  public validateInput = (path: string) => async (value: string) => {
    try {
      const data = (await Axios.get<boolean>(`/validation/${path}/${value}`))
        .data;

      return data;
    } catch (err) {
      return false;
    }
  };
  // tslint:disable-next-line:member-ordering
  public debouncedSection = debounce(this.validateInput("section_id"), 250, {});

  public onSubmit = async (values: any, functions: any) => {
    const {
      data: { token, user }
    } = await Axios.post<{ token: string; user: IDecodedUser }>(
      "/auth/signup",
      values
    );
    localStorage.setItem("token", token);
    this.setState({ user });
  };

  public render() {
    return this.state.user ? (
      <UserContext.Consumer>
        {({ setUser }) => {
          setUser(this.state.user);
          return (
            <Redirect
              push={true}
              to={
                this.state.user.role === "student"
                  ? "/conversations"
                  : "/sections"
              }
            />
          );
        }}
      </UserContext.Consumer>
    ) : (
      <div
        className="conversation-preview"
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h2>Create Account</h2>
        <Formik
          initialValues={this.initialValues}
          onSubmit={this.onSubmit}
          validationSchema={this.validationSchema}
        >
          {({ values, errors, resetForm, handleChange }: any) => {
            return (
              <Form>
                {JSON.stringify(errors)}
                <div style={{ display: "flex" }}>
                  <Field
                    component={Input}
                    label="First Name"
                    name="first_name"
                    type="text"
                  />
                  <Field
                    component={Input}
                    label="Last Name"
                    name="last_name"
                    type="text"
                  />
                  <ErrorMessage name="last_name" />
                </div>
                <div style={{ display: "flex" }}>
                  <Field
                    component={Input}
                    label="Email Address"
                    name="email"
                    type="email"
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <Field
                    component={Input}
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <Field
                    component={Input}
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h3
                    style={{
                      alignSelf: "center",
                      flexGrow: "unset",
                      marginLeft: "10px"
                    }}
                  >
                    Sign up as a{values.role === "instructor" && "n"}
                    ...
                  </h3>
                  <Field
                    type="radio"
                    name="role"
                    checked={values.role === "student"}
                    value="student"
                    id="student"
                  />
                  <label
                    className={`role ${
                      values.role === "student" ? "selected" : ""
                    }`}
                    htmlFor="student"
                  >
                    Student
                  </label>

                  <Field
                    type="radio"
                    name="role"
                    checked={values.role === "instructor"}
                    value="instructor"
                    id="instructor"
                  />
                  <label
                    className={`role ${
                      values.role === "instructor" ? "selected" : ""
                    }`}
                    htmlFor="instructor"
                  >
                    Instructor
                  </label>
                </div>
                <CSSTransition
                  classNames="fade"
                  timeout={300}
                  in={values.role === "student"}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ flexGrow: 1, display: "flex" }}>
                      <Field
                        component={Input}
                        type="text"
                        name="section_id"
                        label="Section ID (optional)"
                      />
                      <FontAwesomeIcon
                        icon={errors.section_id ? faExclamation : faCheck}
                        style={{
                          alignSelf: "center",
                          color: values.section_id
                            ? errors.section_id
                              ? "red"
                              : "green"
                            : "gray",
                          margin: "0 10px"
                        }}
                      />
                    </div>
                  </div>
                </CSSTransition>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <button
                    className="accent-button"
                    type="button"
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={() => resetForm(this.initialValues)}
                  >
                    Reset
                  </button>
                  <button className="accent-button" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export { SignUp };
