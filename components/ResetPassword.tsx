import * as React from "react";
import { Input } from "./Input";
import { CardStyles } from "../styles/CardStyles";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

interface IState {
  newPassword: string;
  confirmNewPassword: string;
}

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $resetToken: string!
    $newPassword: string!
    $confirmNewPassword: string!
  ) {
    resetPassword(
      resetToken: $resetToken
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    ) {
      message
    }
  }
`;

export class ResetPassword extends React.Component<
  { resetToken: string },
  IState
> {
  state = {
    newPassword: "",
    confirmNewPassword: ""
  };

  handleChange = ({
    currentTarget: { value, name }
  }: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ [name]: value } as Pick<IState, keyof IState>);

  render() {
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{ resetToken: this.props.resetToken, ...this.state }}
        refetchQueries={["CURRENT_USER_QUERY"]}
      >
        {(resetPassword, { loading, error }) => (
          <form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();
              await resetPassword();
              Router.push("/conversations");
            }}
          >
            <div className="card selected">
              <h2>Reset Your Password</h2>
              <Input
                label="New Password"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleChange}
              />
              <Input
                label="Confirm New Password"
                name="confirmNewPassword"
                value={this.state.confirmNewPassword}
                onChange={this.handleChange}
              />
              <button>Change Password</button>
            </div>
            <style jsx>{CardStyles}</style>
          </form>
        )}
      </Mutation>
    );
  }
}
