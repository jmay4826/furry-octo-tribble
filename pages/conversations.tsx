import { Messages } from "../components/Messages";
import { Conversations } from "../components/Conversations";
import { SignedInContainer } from "../styles/SignedInContainer";

const ConversationsPage = (props: { query: { conversation_id: string } }) => {
  return (
    <SignedInContainer>
      <Conversations conversation_id={+props.query.conversation_id} />
      {props.query.conversation_id && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "70%",
            flexGrow: 1
          }}
        >
          <Messages conversation_id={+props.query.conversation_id} />
        </div>
      )}
    </SignedInContainer>
  );
};

ConversationsPage.getInitialProps = ({
  query
}: {
  query: { conversation_id: string };
}) => ({ query });

export default ConversationsPage;
