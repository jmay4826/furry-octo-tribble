import * as React from "react";
import { NavbarSignedOut } from "../components/NavbarSignedOut";

export const SignedOutContainer = props => (
  <>
    <NavbarSignedOut />
    {props.children}
    {/* <style jsx>{`
      .container {
        display: flex;
        flex-direction: row;
      }
    `}</style> */}
  </>
);
