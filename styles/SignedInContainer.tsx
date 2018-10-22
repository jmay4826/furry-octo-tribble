import * as React from "react";
import { NavbarSignedIn } from "../components/NavbarSignedIn";

export const SignedInContainer = (props: { children: React.ReactNode }) => (
  <div className="container">
    <NavbarSignedIn />
    {props.children}
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: row;
        height: 100vh;
      }
    `}</style>
  </div>
);
