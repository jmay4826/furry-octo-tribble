import {
  faComments,
  faSignOutAlt,
  faUsers,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { NavLink } from "react-router-dom";

const NavbarSignedIn = ({ role }: { role: "instructor" | "student" }) => (
  <div className="sidebar">
    <NavLink to="/conversations" activeClassName="active">
      <FontAwesomeIcon icon={faComments} size="2x" className="sidebar-icon" />
    </NavLink>
    {role === "instructor" && (
      <NavLink to="/sections" activeClassName="active">
        <FontAwesomeIcon icon={faUsers} size="2x" className="sidebar-icon" />
      </NavLink>
    )}
    <NavLink to="/settings">
      <FontAwesomeIcon icon={faCog} size="2x" className="sidebar-icon" />
    </NavLink>

    <NavLink to="/logout">
      <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="sidebar-icon" />
    </NavLink>
  </div>
);

export { NavbarSignedIn };
