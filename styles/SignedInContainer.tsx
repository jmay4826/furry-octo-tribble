import * as React from "react";
import { NavbarSignedIn } from "../components/NavbarSignedIn";
import { User } from "../components/User";
import { Login } from "../components/Login";
import { NavbarSignedOut } from "../components/NavbarSignedOut";

export const SignedInContainer = (props: { children: React.ReactNode }) => (
  <User>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading</p>;
      if (error) return <p>Error</p>;
      if (!data) return <p>Error</p>;
      if (!data.me) {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <NavbarSignedOut />
            <p className="error">Please sign in to continue.</p>
            <Login />
            <style jsx>{`
              .error {
                border: 1px solid rgba(173, 65, 121, 1);
                background: rgba(173, 65, 121, 0.3);
                align-self: center;
                justify-self: center;
                padding: 10px;
                border-radius: 6px;
              }
            `}</style>
          </div>
        );
      }
      return (
        <div className="container">
          <NavbarSignedIn user={data.me} />
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
    }}
  </User>
);
