import { Field, Form, Formik } from "formik";
import { Input } from "./Input";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match.")
    .label("Confirm password"),
  email: Yup.string()
    .email()
    .label("Email"),
  first_name: Yup.string()
    .min(1)
    .label("First Name"),
  last_name: Yup.string()
    .min(1)
    .label("Last Name"),
  password: Yup.string()
    .min(8)
    .label("Password")
});

export const UpdateUserInfo = ({ user }: { user: IStandardUser }) => (
  <Formik
    initialValues={{
      email: user.email,
      first_name: user.first_name,
      id: user.id,
      last_name: user.last_name
    }}
    validationSchema={validationSchema}
    // onSubmit={this.handleSubmit}
    onSubmit={() => true}
  >
    {({ errors, touched, values }: any) => {
      return (
        <Form style={{ flexBasis: "50%", textAlign: "center" }}>
          <h3>User Information</h3>
          <input type="hidden" value={user.id} name="id" />

          <Field
            component={Input}
            label="First Name"
            name="first_name"
            type="text"
            error={errors.first_name}
          />

          <Field
            component={Input}
            label="Last Name"
            name="last_name"
            type="text"
            error={errors.last_name}
          />
          <Field
            component={Input}
            label="Email Address"
            name="email"
            type="email"
            error={errors.email}
          />

          <button type="submit">Update User Information</button>
          <p
          // style={{
          //   visibility:
          //     this.state.userInformationSuccess ||
          //     this.state.userInformationError
          //       ? "visible"
          //       : "hidden"
          // }}
          >
            {/* {this.state.userInformationSuccess ||
          this.state.userInformationError} */}
            Success message
          </p>
        </Form>
      );
    }}
  </Formik>
);
