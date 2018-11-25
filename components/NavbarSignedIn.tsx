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
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout {
      message
    }
  }
`;

const NavbarSignedIn = ({ user }: { user: IStandardUser }) => (
  <div className="navbar">
    <NavLink
      href="/conversations"
      className="navbar-icon"
      activeClassName="active"
    >
      <FontAwesomeIcon icon={faComments} size="2x" />
    </NavLink>
    {user.role === "instructor" && (
      <NavLink
        href="/sections"
        className="navbar-icon"
        activeClassName="active"
      >
        <FontAwesomeIcon icon={faUsers} size="2x" />
      </NavLink>
    )}
    <NavLink className="navbar-icon" href="/settings" activeClassName="active">
      <FontAwesomeIcon icon={faCog} size="2x" />
    </NavLink>
    <Mutation mutation={LOGOUT_MUTATION}>
      {logout => (
        <NavLink className="navbar-icon" href="/" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
        </NavLink>
      )}
    </Mutation>
    <style jsx>{NavbarStyles}</style>
  </div>
);

export { NavbarSignedIn };
