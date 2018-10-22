import * as React from "react";
import { CardStyles } from "../styles/CardStyles";
import { Input } from "./Input";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

interface IState {
  email: string;
}

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export class RequestReset extends React.Component<{}, IState> {
  state = { email: "" };

  handleChange = ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      [name]: value
    } as Pick<IState, keyof IState>);
  render() {
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={{ email: this.state.email }}
      >
        {(requestReset, { loading, error, called }) => (
          <form
            method="post"
            onSubmit={e => {
              e.preventDefault();
              requestReset();
            }}
          >
            <div className="card">
              <h2>Request a Password Reset</h2>
              <Input
                type="text"
                name="email"
                value={this.state.email}
                label="Email Address"
                onChange={this.handleChange}
              />
              {called && (
                <p>
                  A link to reset your password has been sent! Please check your
                  email.
                </p>
              )}
              <button type="submit">Request password reset</button>
              <style jsx>{CardStyles}</style>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}
