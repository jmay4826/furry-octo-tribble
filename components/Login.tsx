import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { Field, Form, Formik } from "formik";
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

  public clearError = () => this.setState({ error: "" });

  public render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={this.handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, isSubmitting }: any) => {
          return (
            <Form>
              <div
                className="conversation-preview selected"
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  margin: "20%"
                }}
              >
                <h2>Login</h2>
                <Field
                  component={Input}
                  label="Email Address"
                  name="email"
                  type="text"
                  className="full-width"
                  additionalChange={this.clearError}
                  error={touched.email ? errors.email || this.state.error : ""}
                />

                <Field
                  component={Input}
                  label="Password"
                  type="password"
                  name="password"
                  className="full-width"
                  error={touched.password ? errors.password : ""}
                />

                <button type="submit">Submit</button>
                {isSubmitting && <FontAwesomeIcon icon={faSpinner} />}

                <h3>Don't have a login?</h3>
                <h3>
                  <Link to="/signup" style={{}}>
                    Sign up for an account.
                  </Link>
                </h3>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export { Login };
