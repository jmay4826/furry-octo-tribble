import {
  faComments,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Redirect, Route } from "react-router";
import { Link } from "react-router-dom";

const PrivateRoute = (props: any) => {
  console.log("rendering privateRoute", props.loading, props.authenticated);
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
          <Link to="/logout">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              size="2x"
              className="sidebar-icon"
            />
          </Link>
        </div>

        <props.component {...routerProps} />
      </div>
    ) : props.loading ? null : (
      <Redirect to="/" />
    );
  return <Route path={props.path} render={render} />;
};

export { PrivateRoute };
