import {
  faComments,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = (props: any) => {
  const render = (routerProps: any) =>
    props.authenticated ? (
      <div className="container">
        {/* TODO: Move to separate component and add labels */}
        <div className="sidebar">
          <FontAwesomeIcon
            icon={faComments}
            size="2x"
            className="sidebar-icon"
          />
          <FontAwesomeIcon icon={faUser} size="2x" className="sidebar-icon" />
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="2x"
            className="sidebar-icon"
          />
        </div>

        <props.component {...routerProps} />
      </div>
    ) : props.loading ? null : (
      <Redirect to="/" />
    );
  return <Route path={props.path} render={render} />;
};

export { PrivateRoute };
