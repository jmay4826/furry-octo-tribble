import Link from "next/link";
import { withRouter } from "next/router";
import * as React from "react";
import { NavbarStyles } from "../styles/NavbarStyles";

const NavLink = withRouter((props: any) => {
  return (
    <React.Fragment>
      <Link href={props.href}>
        <a
          aria-role="test"
          onClick={props.onClick}
          className={`${props.className}
            ${props.router.pathname === props.href ? props.activeClassName : ""}
          `}
        >
          {props.children}
        </a>
      </Link>
      <style jsx={true}>{`
        .navbar-icon.active {
          color: rgba(255, 255, 255, 1);
        }
      `}</style>
      <style jsx={true}>{NavbarStyles}</style>
    </React.Fragment>
  );
});

export { NavLink };
