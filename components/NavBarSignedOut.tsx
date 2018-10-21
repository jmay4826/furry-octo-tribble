import { faGlobeAfrica } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import Link from "next/link";

export const NavBarSignedOut = () => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between"
    }}
  >
    <Link href="/">
      <h2>
        <FontAwesomeIcon icon={faGlobeAfrica} /> penpals
      </h2>
    </Link>
    <div>
      <Link href="/login">
        <a style={{ margin: "10px" }}>Login</a>
      </Link>
      <Link href="/signup">
        <a style={{ margin: "10px" }}> Sign Up</a>
      </Link>
    </div>
  </div>
);
