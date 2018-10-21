import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
// import { Message } from "./Message";

interface IProps {
  // socket: SocketIOClient.Socket;
  query: {
    conversation_id: string;
  };
}

interface IState {
  error: string;
  loading: boolean;
  messages: IMessage[];
}

const GET_MESSAGES_QUERY = gql`
  query GET_MESSAGES_QUERY($where: $ConversationsWhereInput) {
    conversations(where: $ConversationsWhereInput) {
      id
      messages {
        content
      }
    }
  }
`;

const initialState = {
  error: "",
  loading: true,
  messages: []
};

class Messages extends React.Component<IProps, IState> {
  public container: React.RefObject<HTMLDivElement>;
  public messagesBottom: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);
    this.state = initialState;
    this.container = React.createRef();
    this.messagesBottom = React.createRef();
  }

  public handleMessage = (messages: IMessage[]) => {
    this.setState({ messages, loading: false }, () => {
      if (this.container.current && this.messagesBottom.current) {
        this.container.current.scrollTo(
          0,
          this.messagesBottom.current.offsetTop
        );
      }
    });
    // this.props.refreshConversations();
  };

  public componentWillUnmount() {
    // this.props.socket.off("new message");
    // this.props.socket.off("unauthorized");
  }

  public render() {
    return (
      // <Query
      //   query={GET_MESSAGES_QUERY}
      //   variables={{ where: { user_conversations_some: {
      //     conversation_id: this.props.query.conversation_id }}
      // >
      //   {({ data, loading, error }) => {
      //     if (loading) return <p>Loading</p>;
      //     if (error) return <p>Error</p>;
      //     console.log(data);
      // return (
      <>
        <div className="messages-header">
          {!this.state.messages.length &&
            !this.state.loading &&
            "No messages yet"}
          {this.state.loading && "Loading messages..."}
          {!!this.state.messages.length &&
            this.state.messages[0].users.reduce(
              (acc, user, i, arr) =>
                i !== arr.length - 1 ? `${acc} ${user},` : `${acc} ${user}`,
              ""
            )}
        </div>
        <div ref={this.container} className="messages-list">
          {this.state.messages.map(message => (
            <p>{JSON.stringify(message)}</p>
            // <Message key={message.message_id} {...message} />
          ))}

          <div ref={this.messagesBottom} />
        </div>
      </>
    );
  }
}
// </Query>
//     );
//   }
// }

export { Messages };
