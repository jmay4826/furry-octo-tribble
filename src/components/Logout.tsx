import * as React from "react";
import { Redirect } from "react-router";

class Logout extends React.Component<any, {}> {
  public componentDidMount() {
    localStorage.clear();
    this.props.logout();
  }
  public render() {
    return <Redirect to="/login" />;
  }
}

export { Logout };
