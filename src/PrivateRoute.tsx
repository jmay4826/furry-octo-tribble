import {
  faComments,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Redirect, Route } from "react-router";
import { NavLink } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const render = (routerProps: any) => {
    return props.authenticated ? (
      <div className="container">
        {/* TODO: 
          * Move to separate component 
          * Add labels
          
          *  */}
        <div className="sidebar">
          <NavLink to="/conversations" activeClassName="active">
            <FontAwesomeIcon
              icon={faComments}
              size="2x"
              className="sidebar-icon"
            />
          </NavLink>
          <NavLink to="/profile" activeClassName="active">
            <FontAwesomeIcon icon={faUser} size="2x" className="sidebar-icon" />
          </NavLink>
          <NavLink to="/logout">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              size="2x"
              className="sidebar-icon"
            />
          </NavLink>
        </div>
        <div style={{ flexGrow: 1 }}>
          <props.component {...routerProps} />
        </div>
      </div>
    ) : props.loading ? null : (
      <Redirect to="/" />
    );
  };
  return <Route path={props.path} render={render} />;
};

export { PrivateRoute };
