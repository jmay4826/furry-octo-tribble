import * as React from "react";
import { Sections } from "../components/Sections";
import { SignedInContainer } from "../styles/SignedInContainer";

const SectionPage = ({
  query
}: {
  query: { section_id?: string; user_id?: string };
}) => (
  <SignedInContainer>
    <Sections section_id={query.section_id} user_id={query.user_id} />
  </SignedInContainer>
);

SectionPage.getInitialProps = ({
  query
}: {
  query: { section_id?: string; user_id?: string };
}) => ({ query });

export default SectionPage;
