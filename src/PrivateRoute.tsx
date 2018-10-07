import * as React from "react";
import { Redirect, Route } from "react-router";

interface IProps {
  authenticated: boolean;
  path: string;
  component: React.ComponentClass;
}

const PrivateRoute = ({ authenticated, path, component }: IProps) =>
  !authenticated ? (
    <Redirect to="/" push={true} />
  ) : (
    <Route path={path} component={component} />
  );

export { PrivateRoute };
