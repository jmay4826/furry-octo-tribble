import {
  faComments,
  faSignOutAlt,
  faUsers,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { NavLink } from "../components/NavLink";
import { NavbarStyles } from "../styles/NavbarStyles";
import { User } from "./User";

const NavbarSignedIn = () => (
  <User>
    {({ loading, error, data }) => {
      if (error) return <p>Error</p>;
      if (!data && !loading) return <p>Error</p>;
      return (
        <div className="navbar">
          <NavLink
            href="/conversations"
            className="navbar-icon"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faComments} size="2x" />
          </NavLink>
          {data &&
            data.me.role === "instructor" && (
              <NavLink
                href="/sections"
                className="navbar-icon"
                activeClassName="active"
              >
                <FontAwesomeIcon icon={faUsers} size="2x" />
              </NavLink>
            )}
          <NavLink
            className="navbar-icon"
            href="/settings"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faCog} size="2x" />
          </NavLink>

          <NavLink className="navbar-icon" href="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
          </NavLink>
          <style jsx>{NavbarStyles}</style>
        </div>
      );
    }}
  </User>
);

export { NavbarSignedIn };
