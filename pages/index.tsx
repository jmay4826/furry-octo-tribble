import * as React from "react";
import { Home } from "../components/Home";
import { SignedOutContainer } from "../styles/SignedOutContainer";

export default () => (
  <SignedOutContainer>
    <Home />
  </SignedOutContainer>
);
