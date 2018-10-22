import * as React from "react";
import Link from "next/link";
import * as Yup from "yup";
import { Input } from "./Input";
import { CardStyles } from "../styles/CardStyles";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      role
      email
      first_name
      last_name
    }
  }
`;

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
  errors: {
    email: string;
    password: string;
  };
}

const initialState = {
  email: "",
  errors: {
    email: "",
    password: ""
  },
  password: ""
};

class Login extends React.Component<{}, IState> {
  state = initialState;

  handleChange = async ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await validationSchema.validate(this.state, { abortEarly: false });
      this.setState(prevState => ({
        [name as "email"]: value,
        errors: { email: "", password: "" }
      }));
    } catch (err) {
      const errors = err.inner.reduce(
        (acc: any, error: Yup.ValidationError) => ({
          ...acc,
          [error.path]: error.message
        }),
        {}
      );
      this.setState({ [name as "email"]: value, errors });
    }
  };

  public render() {
    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={{ email: this.state.email, password: this.state.password }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(login, { loading, error }) => {
          return (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const user = (await login()) as IDecodedUser;
                console.log(user);
                Router.push(
                  user.role === "instructor" ? "/sections" : "/conversations"
                );
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                className="card selected"
                style={{
                  flexBasis: "50%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center"
                }}
              >
                <h2>Login</h2>
                <Input
                  label="Email Address"
                  name="email"
                  type="text"
                  error={this.state.errors.email || (error && error.message)}
                  onChange={this.handleChange}
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  error={this.state.errors.password}
                  onChange={this.handleChange}
                />
                <button
                  type="submit"
                  disabled={
                    !!this.state.errors.email || !!this.state.errors.password
                  }
                  style={{ alignSelf: "center" }}
                >
                  Submit
                </button>

                <h3>Don't have a login?</h3>
                <h3>
                  <Link href="/signup">
                    <a>Sign up for an account.</a>
                  </Link>
                </h3>
              </div>
              <style jsx>{CardStyles}</style>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export { Login };
