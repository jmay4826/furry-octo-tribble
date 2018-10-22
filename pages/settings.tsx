import { withRouter } from "next/router";

import { SignedInContainer } from "../styles/SignedInContainer";
import { Settings } from "../components/Settings";

const SettingsPage = (props: any) => (
  <SignedInContainer>
    <Settings />
  </SignedInContainer>
);

export default withRouter(SettingsPage);
