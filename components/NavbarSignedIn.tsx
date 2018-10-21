import {
  faComments,
  faSignOutAlt,
  faUsers,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { NavLink } from "../components/NavLink";
import { SidebarStyles } from "../styles/SidebarStyles";

const NavbarSignedIn = ({ role }: { role: "instructor" | "student" }) => (
  <div className="sidebar">
    <NavLink href="/conversations" activeClassName="active">
      <FontAwesomeIcon icon={faComments} size="2x" className="sidebar-icon" />
    </NavLink>
    {role === "instructor" && (
      <NavLink href="/sections" activeClassName="active">
        <FontAwesomeIcon icon={faUsers} size="2x" className="sidebar-icon" />
      </NavLink>
    )}
    <NavLink href="/settings" activeClassName="active">
      <FontAwesomeIcon icon={faCog} size="2x" className="sidebar-icon" />
    </NavLink>

    <NavLink href="/logout">
      <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="sidebar-icon" />
    </NavLink>
    <SidebarStyles />
  </div>
);

export { NavbarSignedIn };
