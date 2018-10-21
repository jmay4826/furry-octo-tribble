// import { Messages } from "../components/Messages";
import { Conversations } from "../components/Conversations";
import { SignedInContainer } from "../styles/SignedInContainer";

const ConversationsPage = (props: { query: { conversation_id: string } }) => {
  return (
    <SignedInContainer>
      <Conversations {...props} />
      {/* <Messages {...props} /> */}
    </SignedInContainer>
  );
};

ConversationsPage.getInitialProps = ({ query }: any) => ({ query });

export default ConversationsPage;
