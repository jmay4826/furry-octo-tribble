import * as React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";

interface IProps {
  authenticated: boolean;
  path: string;
  component: React.ComponentClass;
}

const PrivateRoute = ({
  authenticated,
  path,
  component: Component
}: IProps) => {
  const render = (props: RouteComponentProps) =>
    authenticated ? <Component {...props} /> : <Redirect to="/" push={true} />;

  return <Route path={path} render={render} />;
};

export { PrivateRoute };
