import { Field, Form, Formik } from "formik";
import { Input } from "./Input";
import * as Yup from "yup";
import { adopt } from "react-adopt";
import { User } from "./User";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    updateUser(first_name: $first_name, last_name: $last_name, email: $email) {
      message
    }
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .label("Email")
    .required(),
  first_name: Yup.string()
    .min(1)
    .required()
    .label("First Name"),
  last_name: Yup.string()
    .min(1)
    .required()
    .label("Last Name")
});

const Composed = adopt({
  user: ({ render }: any) => <User>{render}</User>,
  updateUser: ({ render }: any) => (
    <Mutation mutation={UPDATE_USER_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  formik: ({ user, updateUser, render }: any) => {
    console.log(user);
    return (
      <Formik
        initialValues={{
          email: user.data.me.email,
          first_name: user.data.me.first_name,
          id: user.data.me.id,
          last_name: user.data.me.last_name
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          updateUser.mutation({ variables: values });
        }}
      >
        {render}
      </Formik>
    );
  }
});

export const UpdateUserInfo = ({ user }: { user: IStandardUser }) => (
  <Composed>
    {({ formik, updateUser }: any) => {
      console.log(updateUser);
      return (
        <Form style={{ flexBasis: "50%", textAlign: "center" }}>
          <h3>User Information</h3>
          <input type="hidden" value={user.id} name="id" />

          <Field
            component={Input}
            label="First Name"
            name="first_name"
            type="text"
            error={formik.errors.first_name}
          />

          <Field
            component={Input}
            label="Last Name"
            name="last_name"
            type="text"
            error={formik.errors.last_name}
          />
          <Field
            component={Input}
            label="Email Address"
            name="email"
            type="email"
            error={formik.errors.email}
          />

          <button type="submit">Update User Information</button>
          <p
            style={{
              visibility: updateUser.result.error ? "visible" : "hidden"
            }}
          >
            A user already exists with this email address.
          </p>
          <p
            style={{
              visibility: updateUser.result.called ? "visible" : "hidden"
            }}
          >
            Successfully Updated
          </p>
        </Form>
      );
    }}
  </Composed>
);
