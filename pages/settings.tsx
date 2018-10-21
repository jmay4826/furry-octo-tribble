import { withRouter } from "next/router";

import { SignedInContainer } from "../styles/SignedInContainer";

const Settings = (props: any) => (
  <SignedInContainer>
    <p>Settings</p>
  </SignedInContainer>
);

export default withRouter(Settings);
