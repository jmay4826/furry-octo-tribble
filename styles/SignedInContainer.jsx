import * as React from "react";
import { NavbarSignedIn } from "../components/NavbarSignedIn";

export const SignedInContainer = props => (
  <div className="container">
    <NavbarSignedIn role="instructor" />
    {props.children}
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: row;
      }
    `}</style>
  </div>
);
