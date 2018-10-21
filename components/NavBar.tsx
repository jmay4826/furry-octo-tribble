import * as React from "react";
import { NavbarSignedIn } from "./NavbarSignedIn";
import { NavBarSignedOut } from "./NavBarSignedOut";

export const NavBar = ({ user }: { user: IDecodedUser }) => {
  return user.role ? <NavbarSignedIn role={user.role} /> : <NavBarSignedOut />;
};
