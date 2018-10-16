import { Field } from "formik";
import * as React from "react";
import { Input } from "./Input";

export const UserInformation = ({
  errors,
  touched
}: {
  errors: any;
  touched: any;
}) => (
  <React.Fragment>
    <div style={{ display: "flex" }}>
      <Field
        component={Input}
        label="First Name"
        name="first_name"
        type="text"
        inputStyle={
          errors.first_name && touched.first_name
            ? { border: "1px solid red" }
            : {}
        }
      />

      <Field
        component={Input}
        label="Last Name"
        name="last_name"
        type="text"
        inputStyle={
          errors.last_name && touched.last_name
            ? { border: "1px solid red" }
            : {}
        }
      />
    </div>
    <div style={{ display: "flex" }}>
      <Field
        component={Input}
        label="Email Address"
        name="email"
        type="email"
        inputStyle={
          errors.email && touched.email ? { border: "1px solid red" } : {}
        }
      />
    </div>
    <div style={{ display: "flex" }}>
      <Field
        component={Input}
        label="Password"
        name="password"
        type="password"
        inputStyle={
          errors.password && touched.password ? { border: "1px solid red" } : {}
        }
      />
      <Field
        component={Input}
        label="Confirm Password"
        name="confirm_password"
        type="password"
        inputStyle={
          errors.confirm_password && touched.confirm_password
            ? { border: "1px solid red" }
            : {}
        }
      />
    </div>
  </React.Fragment>
);
