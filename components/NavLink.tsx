import * as React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { NavbarStyles } from "../styles/NavbarStyles";

const NavLink = withRouter((props: any) => {
  return (
    <React.Fragment>
      <Link href={props.href}>
        <a
          className={`${props.className}
            ${props.router.pathname === props.href ? props.activeClassName : ""}
          `}
        >
          {props.children}
        </a>
      </Link>
      <style jsx>{`
        .navbar-icon.active {
          color: rgba(255, 255, 255, 1);
        }
      `}</style>
      <style jsx>{NavbarStyles}</style>
    </React.Fragment>
  );
});

export { NavLink };
