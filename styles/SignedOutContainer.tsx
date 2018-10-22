import * as React from "react";
import { NavbarSignedOut } from "../components/NavbarSignedOut";

export const SignedOutContainer = (props: { children: React.ReactNode }) => (
  <React.Fragment>
    <NavbarSignedOut />
    {props.children}
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: row;
      }
    `}</style>
  </React.Fragment>
);
