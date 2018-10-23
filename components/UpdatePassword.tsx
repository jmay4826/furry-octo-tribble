import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

import { Input } from "./Input";

export const UpdatePassword = ({ user }: { user: IStandardUser }) => (
  <Formik
    // onSubmit={this.updatePassword}
    onSubmit={() => true}
    initialValues={{
      confirmPassword: "",
      currentPassword: "",
      id: user.id,
      newPassword: ""
    }}
    validationSchema={Yup.object().shape({
      confirmPassword: Yup.string()
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
    })}
  >
    {({ values, errors }: any) => {
      return (
        <Form
          style={{
            flexBasis: "50%",
            textAlign: "center"
          }}
        >
          <h3>Change Password</h3>
          <input type="hidden" value={user.id} name="id" />
          <Field
            name="currentPassword"
            component={Input}
            error={errors.currentPassword}
            label="Current Password"
          />
          <Field
            name="newPassword"
            component={Input}
            error={errors.newPassword}
            label="New Password"
          />
          <Field
            name="confirmPassword"
            component={Input}
            error={errors.confirmPassword}
            label="Confirm Password"
          />
          <button type="submit">Update Password</button>
          <p
          // style={{
          //   visibility:
          //     this.state.passwordSuccess ||
          //     this.state.passwordError
          //       ? "visible"
          //       : "hidden"
          // }}
          >
            {/* {this.state.passwordSuccess ||
                              this.state.passwordError} */}
            Success or error
          </p>
        </Form>
      );
    }}
  </Formik>
);
