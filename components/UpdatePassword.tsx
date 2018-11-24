import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { adopt } from "react-adopt";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { User } from "./User";
import { Input } from "./Input";

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UPDATE_PASSWORD_MUTATION(
    $currentPassword: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    updatePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    ) {
      message
    }
  }
`;

const validationSchema = Yup.object().shape({
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match.")
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
});

const Composed = adopt({
  user: ({ render }: any) => <User>{render}</User>,
  updatePassword: ({ render }: any) => (
    <Mutation mutation={UPDATE_PASSWORD_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  formik: ({ user, updatePassword, render }: any) => {
    console.log(user);
    return (
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          updatePassword.mutation({ variables: values });
        }}
      >
        {render}
      </Formik>
    );
  }
});

export const UpdatePassword = ({ user }: { user: IStandardUser }) => (
  <Composed>
    {({ user, updatePassword, formik }: any) => {
      return (
        <Form
          style={{
            flexBasis: "50%",
            textAlign: "center"
          }}
        >
          <h3>Change Password</h3>
          <input type="hidden" value={user.data.me.id} name="id" />
          <Field
            name="currentPassword"
            component={Input}
            error={formik.errors.currentPassword}
            label="Current Password"
            type="password"
          />
          <Field
            name="newPassword"
            component={Input}
            error={formik.errors.newPassword}
            label="New Password"
            type="password"
          />
          <Field
            name="confirmNewPassword"
            component={Input}
            error={formik.errors.confirmNewPassword}
            label="Confirm Password"
            type="password"
          />
          <button type="submit">Update Password</button>
          <p
            style={{
              visibility: updatePassword.result.error ? "visible" : "hidden"
            }}
          >
            Incorrect current password.
          </p>
          <p
            style={{
              visibility: updatePassword.result.called ? "visible" : "hidden"
            }}
          >
            Successfully Updated
          </p>
        </Form>
      );
    }}
  </Composed>
);
