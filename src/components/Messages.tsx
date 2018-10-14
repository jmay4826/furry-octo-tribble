import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Message } from "./Message";

interface IProps extends RouteComponentProps<{ conversation_id: string }> {
  refreshConversations: () => void;
  socket: SocketIOClient.Socket;
}

interface IState {
  error: string;
  loading: boolean;
  messages: IMessage[];
}

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

  public componentDidMount() {
    this.props.socket.emit("authenticate", {
      conversation_id: this.props.match.params.conversation_id,
      token: localStorage.getItem("token")
    });
    this.props.socket.on("new message", this.handleMessage);

    this.props.socket.on("unauthorized", this.handleUnauthorized);
  }

  public handleUnauthorized = () => {
    this.setState({
      error: "Could not load messages. Please try logging in again."
    });
  };

  public handleMessage = (messages: IMessage[]) => {
    this.setState({ messages, loading: false }, () => {
      if (this.container.current && this.messagesBottom.current) {
        this.container.current.scrollTo(
          0,
          this.messagesBottom.current.offsetTop
        );
      }
    });
    this.props.refreshConversations();
  };

  public componentWillUnmount() {
    this.props.socket.off("new message");
    this.props.socket.off("unauthorized");
  }

  public render() {
    return this.state.error ? (
      <React.Fragment>
        <div className="messages-header">Error</div>
        <div className="messages-list">
          <p className="error">{this.state.error}</p>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
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
            <Message key={message.message_id} {...message} />
          ))}

          <div ref={this.messagesBottom} />
        </div>
      </React.Fragment>
    );
  }
}

export { Messages };
