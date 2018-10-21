import Link from "next/link";
import { withRouter } from "next/router";

const NavLink = withRouter((props: any) => {
  return (
    <>
      <Link href={props.href}>
        <a
          className={
            props.router.pathname === props.href ? props.activeClassName : ""
          }
        >
          {props.children}
        </a>
      </Link>
      <style jsx>{`
        .active > .sidebar-icon {
          color: rgba(255, 255, 255, 1);
        }
      `}</style>
    </>
  );
});

export { NavLink };
