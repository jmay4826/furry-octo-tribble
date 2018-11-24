import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { Field, FieldArray, Form, Formik, ErrorMessage } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { BulkSectionUpload } from "./BulkSectionUpload";
import { Input } from "./Input";
import { Card } from "./Card";

// interface IParams {
//   section_id: string;
// }

interface IProps {
  // interface IProps extends RouteComponentProps<IParams> {
  // refreshSections: () => Promise<void>;
}

class NewSection extends React.Component<IProps, any> {
  public validationSchema = Yup.object().shape({
    collaborators: Yup.array().of(Yup.string()),
    description: Yup.string().required(),
    id: Yup.string().required()
  });

  public render() {
    return (
      <React.Fragment>
        <div className="main-content-header">
          {/* <span style={{ visibility: "hidden" }}> */}
          Add a section
          {/* </span> */}
        </div>
        <div
          className="messages-list"
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Card header="">
            <Formik
              initialValues={{
                collaborators: [""],
                description: "",
                id: "",
                type: "blank"
              }}
              onSubmit={console.log}
              validationSchema={this.validationSchema}
            >
              {({ values, submitForm, errors }: any) => {
                console.log(errors);
                return (
                  <Form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      <h3
                        style={{
                          alignSelf: "center",
                          flexGrow: "unset",
                          marginLeft: "10px"
                        }}
                      >
                        Add a...
                      </h3>
                      <Field
                        type="radio"
                        name="type"
                        checked={values.type === "blank"}
                        value="blank"
                        id="blank"
                      />
                      <label
                        className={`role ${
                          values.type === "blank" ? "selected" : ""
                        }`}
                        htmlFor="blank"
                      >
                        Blank Section
                      </label>
                      {/* <Field
                        type="radio"
                        name="type"
                        checked={values.type === "withStudents"}
                        value="withStudents"
                        id="withStudents"
                      />
                      <label
                        className={`role ${
                          values.type === "withStudents" ? "selected" : ""
                        }`}
                        htmlFor="withStudents"
                      >
                        Section with Students
                      </label> */}
                      <Field
                        type="radio"
                        name="type"
                        checked={values.type === "collaborator"}
                        value="collaborator"
                        id="collaborator"
                      />
                      <label
                        className={`role ${
                          values.type === "collaborator" ? "selected" : ""
                        }`}
                        htmlFor="collaborator"
                      >
                        Section as a Collaborator
                      </label>
                    </div>
                    {values.type === "blank" && (
                      <React.Fragment>
                        <Field
                          component={Input}
                          autoComplete="new-id"
                          type="text"
                          name="id"
                          label="ID (must be unique)"
                        />
                        <ErrorMessage name="id" />

                        <Field
                          component={Input}
                          autoComplete="new-description"
                          type="text"
                          name="description"
                          label="Section Description"
                        />
                        <FieldArray name="collaborators">
                          {({ push, remove }) => (
                            <div>
                              {!!values.collaborators.length &&
                                values.collaborators.map(
                                  (_: any, index: any) => (
                                    <div
                                      key={index}
                                      style={{
                                        alignItems: "center",
                                        display: "flex"
                                      }}
                                    >
                                      <Field
                                        component={Input}
                                        name={`collaborators.${index}`}
                                        label="Collaborator Email (optional)"
                                        style={{ flexGrow: 1 }}
                                      />
                                      <button onClick={() => remove(index)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                      </button>
                                    </div>
                                  )
                                )}
                              <button type="button" onClick={() => push("")}>
                                Add a collaborator
                              </button>
                              <button>Clear</button>
                              <button type="submit">Submit</button>
                            </div>
                          )}
                        </FieldArray>
                      </React.Fragment>
                    )}
                    {values.type === "withStudents" && <BulkSectionUpload />}
                    {values.type === "collaborator" &&
                      "Coming soon. Please reach out to the collaborating instructor to be added."}
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export { NewSection };
