import * as React from "react";
import { RouteComponentProps } from "react-router";
import { UserContext } from "src/App";

import { Formik } from "formik";
import { UserInformation } from "./UserInformation";
import { JoinSection } from "./JoinSection";

interface IProps extends RouteComponentProps {}

export class Settings extends React.Component<IProps, any> {
  public render() {
    return (
      <UserContext.Consumer>
        {({ user }) => {
          return (
            <div className="messages-container">
              <div className="messages-header">
                {user.first_name}
                's Settings
              </div>
              <div className="messages-list">
                <div className="conversation-preview">
                  <div className="conversation-preview-users">
                    User Information
                  </div>
                  <div className="conversation-preview-content">
                    <Formik
                      initialValues={{
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: "",
                        confirm_password: ""
                      }}
                      onSubmit={(values: any) => console.log(values)}
                    >
                      {({ errors, touched }: any) => (
                        <React.Fragment>
                          <UserInformation errors={errors} touched={touched} />
                        </React.Fragment>
                      )}
                    </Formik>
                  </div>
                </div>
                <div className="conversation-preview">
                  <div className="conversation-preview-users">
                    Enrolled Sections
                  </div>
                  <div
                    className="conversation-preview-content"
                    style={{ color: "black" }}
                  >
                    <JoinSection {...this.props} />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}
