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
        error={touched.first_name && errors.first_name}
        className="full-width"
      />

      <Field
        component={Input}
        label="Last Name"
        name="last_name"
        type="text"
        error={touched.last_name && errors.last_name}
        className="full-width"
      />
    </div>
    <div style={{ display: "flex" }}>
      <Field
        component={Input}
        label="Email Address"
        name="email"
        type="email"
        error={touched.email && errors.email}
        className="full-width"
      />
    </div>
  </React.Fragment>
);
