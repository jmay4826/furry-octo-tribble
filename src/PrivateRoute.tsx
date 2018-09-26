import * as React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = (props: any) => {
  const render = (routerProps: any) =>
    props.authenticated ? (
      <props.component {...routerProps} />
    ) : props.loading ? null : (
      <Redirect to="/" />
    );
  return <Route path={props.path} render={render} />;
};

export { PrivateRoute };
