import {
  faCog,
  faComments,
  faSignOutAlt,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
import { NavLink } from "../components/NavLink";
import { NavbarStyles } from "../styles/NavbarStyles";

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
      <FontAwesomeIcon title="Conversations" icon={faComments} size="2x" />
    </NavLink>
    {user.role === "instructor" && (
      <NavLink
        href="/sections"
        className="navbar-icon"
        activeClassName="active"
      >
        <FontAwesomeIcon title="Sections" icon={faUsers} size="2x" />
      </NavLink>
    )}
    <NavLink className="navbar-icon" href="/settings" activeClassName="active">
      <FontAwesomeIcon title="Settings" icon={faCog} size="2x" />
    </NavLink>
    <Mutation mutation={LOGOUT_MUTATION} refetchQueries={["ME"]}>
      {logout => (
        <NavLink className="navbar-icon" href="/" onClick={logout}>
          <FontAwesomeIcon title="Logout" icon={faSignOutAlt} size="2x" />
        </NavLink>
      )}
    </Mutation>
    <style jsx={true}>{NavbarStyles}</style>
  </div>
);

export { NavbarSignedIn };
