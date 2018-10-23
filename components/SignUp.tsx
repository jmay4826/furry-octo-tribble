import Axios from "axios";
import { Field, Form, Formik } from "formik";
import * as React from "react";

import { CSSTransition } from "react-transition-group";
import * as Yup from "yup";
import { Input } from "./Input";
import { UserInformation } from "./UserInformation";
import { SectionInput } from "./SectionInput";

interface IState {
  user?: IDecodedUser;
  error: string;
}

class SignUp extends React.Component<{}, IState> {
  public initialValues = {
    confirm_password: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    role: "student",
    section_id: "",
    understand: false
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
    section_id: Yup.string().label("Section ID"),
    understand: Yup.bool()
      .oneOf([true])
      .required()
      .label("This")
  });

  constructor(props: {}) {
    super(props);
    this.state = {
      error: "",
      user: undefined
    };
  }

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
    return (
      <div
        className="conversation-preview"
        style={{
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          minWidth: "75%"
        }}
      >
        <h2>Create Account</h2>
        <Formik
          initialValues={this.initialValues}
          onSubmit={this.onSubmit}
          validationSchema={this.validationSchema}
        >
          {({ values, errors, resetForm, touched }: any) => {
            return (
              <Form>
                <UserInformation errors={errors} touched={touched} />
                <div style={{ display: "flex" }}>
                  <Field
                    component={Input}
                    label="Password"
                    name="password"
                    type="password"
                    error={touched.password && errors.password}
                    className="full-width"
                  />
                  <Field
                    component={Input}
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    error={errors.confirm_password}
                    className="full-width"
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
                  unmountOnExit={true}
                  mountOnEnter={true}
                >
                  <Field
                    name="section_id"
                    component={SectionInput}
                    error={errors.section_id}
                  />
                </CSSTransition>
                <div>
                  <div
                    style={{
                      padding: "10px",
                      border: `1px solid ${
                        touched.understand && errors.understand
                          ? "red"
                          : "white"
                      }`,

                      borderRadius: "6px",
                      margin: "10px"
                    }}
                  >
                    <Field
                      type="checkbox"
                      name="understand"
                      id="understand"
                      style={{ margin: "10px" }}
                    />
                    <label htmlFor="understand">
                      I understand that private information should not be shared
                      on this service. Messages can be read by my instructors,
                      my conversation partners, and their instructors.
                    </label>
                  </div>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <button
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
