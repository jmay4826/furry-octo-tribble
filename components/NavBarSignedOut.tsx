import { faGlobeAfrica } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Link } from "react-router-dom";

export const NavBarSignedOut = () => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between"
    }}
  >
    <Link to="/">
      <h2>
        <FontAwesomeIcon icon={faGlobeAfrica} /> penpals
      </h2>
    </Link>
    <div>
      <Link to="/login" style={{ margin: "10px" }}>
        Login
      </Link>
      <Link to="/signup" style={{ margin: "10px" }}>
        Sign Up
      </Link>
    </div>
  </div>
);
