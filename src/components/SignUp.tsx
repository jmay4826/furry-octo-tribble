import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Axios from "axios";
import { Field, Form, Formik } from "formik";
import * as debounce from "p-debounce";
import * as queryString from "query-string";
import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { CSSTransition } from "react-transition-group";
import { UserContext } from "src/App";
import * as Yup from "yup";
import { Input } from "./Input";
import { UserInformation } from "./UserInformation";

interface IState {
  user?: IDecodedUser;
  error: string;
}

class SignUp extends React.Component<RouteComponentProps, IState> {
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
      .required()
      .label("Confirm Password"),
    email: Yup.string()
      .email()
      .required()
      .label("Email"),
    first_name: Yup.string()
      .required()
      .label("First Name"),
    last_name: Yup.string()
      .required()
      .label("Last Name"),
    password: Yup.string()
      .min(8)
      .required()
      .label("Password"),
    role: Yup.string().oneOf(
      ["student", "instructor"],
      "Please choose a student or instructor account"
    ),
    section_id: Yup.string()
      .test(
        "section_id",
        "Section ID is not valid. Try a different ID or remove it completely.",
        async value => (!value ? true : await this.debouncedSection(value))
      )
      .label("Section ID")
  });

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      error: "",
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
    try {
      const {
        data: { token, user }
      } = await Axios.post<{ token: string; user: IDecodedUser }>(
        "/auth/signup",
        values
      );
      localStorage.setItem("token", token);
      this.setState({ user });
    } catch (e) {
      if (e.response.status === 409) {
        this.setState({ error: e.response.data });
      } else {
        this.setState({ error: "An unknown error occurred." });
      }
    }
  };

  public render() {
    return this.state.user ? (
      <UserContext.Consumer>
        {({ setUser }) => {
          if (this.state.user) {
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
          } else {
            return null;
          }
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
          {({ values, errors, resetForm, handleChange, touched }: any) => {
            return (
              <Form>
                <UserInformation errors={errors} touched={touched} />
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
                  unmountOnExit={true}
                  mountOnEnter={true}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ flexGrow: 1, display: "flex" }}>
                      <Field
                        component={Input}
                        type="text"
                        name="section_id"
                        label="Section ID (optional)"
                        inputStyle={
                          errors.section_id && touched.section_id
                            ? { border: "1px solid red" }
                            : {}
                        }
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

                <div
                  className="error"
                  style={{
                    visibility:
                      this.state.error ||
                      (Object.keys(errors).length > 0 &&
                        Object.keys(touched).length >= 6)
                        ? "visible"
                        : "hidden"
                  }}
                >
                  Please correct these errors to submit:
                  <ul>
                    {Object.keys(errors).map(
                      key =>
                        touched[key] || key === "section_id" ? (
                          <li key={key}>{errors[key]}</li>
                        ) : null
                    )}
                    {this.state.error && <li>{this.state.error}</li>}
                  </ul>
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
