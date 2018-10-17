import Axios from "axios";
import { Formik, Field, Form } from "formik";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "./Input";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required()
    .label("Email Address"),
  password: Yup.string()
    .required()
    .label("Password")
});

interface IState {
  email: string;
  password: string;
  error: string;
}

interface IProps extends RouteComponentProps {
  handleLogin: (token: string) => void;
}

const initialState = {
  email: "",
  error: "",
  password: ""
};

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public handleSubmit = async (values: any) => {
    try {
      const {
        data: { token }
      }: { data: { token: string } } = await Axios.post("/auth/login", values);

      localStorage.setItem("token", token);
      this.props.handleLogin(token);
    } catch (err) {
      let error: string;
      if (err.response.status === 401) {
        error = "Incorrect email or password. Please try again.";
      } else {
        error = "An unknown error occurred. Please try again.";
      }
      this.setState({ error });
    }
  };

  public render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={this.handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }: any) => {
          return (
            <div
              className="conversation-preview selected"
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                margin: "20%"
              }}
            >
              <Form>
                <h2>Login</h2>
                <Field
                  component={Input}
                  label="Email Address"
                  name="email"
                  type="text"
                  className="full-width"
                />

                <Field
                  component={Input}
                  label="Password"
                  type="password"
                  name="password"
                  className="full-width"
                />

                <button type="submit">Submit</button>
                <h3>
                  Don't have a login?{" "}
                  <Link to="/signup">Create an account.</Link>
                </h3>
                {(this.state.error ||
                  (!!Object.keys(errors).length &&
                    !!Object.keys(touched).length)) && (
                  <div className="error">
                    <ul>
                      {this.state.error && <li>{this.state.error}</li>}
                      {Object.keys(errors).map(
                        key =>
                          touched[key] ? <li key={key}>{errors[key]}</li> : null
                      )}
                    </ul>
                  </div>
                )}
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  }
}

export { Login };
