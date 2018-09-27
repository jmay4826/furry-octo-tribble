import * as React from "react";
import { Message } from "./Message";

interface IProps {
  conversation_id: string;
  socket: SocketIOClient.Socket;
}

interface IState {
  error: string;
  loading: boolean;
  messages: IMessage[];
  current_user: string;
}

const initialState = {
  current_user: "",
  error: "",
  loading: true,
  messages: []
};

class Messages extends React.Component<IProps, IState> {
  public container: HTMLDivElement;
  public messagesBottom: HTMLDivElement;

  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public componentDidMount() {
    this.props.socket.emit("authenticate", {
      conversation_id: this.props.conversation_id,
      token: localStorage.getItem("token")
    });
    this.props.socket.on(
      "new message",
      ({
        messages,
        current_user
      }: {
        messages: IMessage[];
        current_user: string;
      }) => {
        this.setState({ messages, loading: false, current_user });
        this.container.scrollTo(0, this.messagesBottom.offsetTop);
      }
    );

    this.props.socket.on("unauthorized", () => {
      this.setState({
        error: "Could not load messages. Please try logging in again."
      });
    });
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.conversation_id !== this.props.conversation_id) {
      this.setState({ messages: [], loading: true });
      this.props.socket.emit("authenticate", {
        conversation_id: this.props.conversation_id,
        token: localStorage.getItem("token")
      });
    }
  }

  public createContainerRef = (element: HTMLDivElement) =>
    (this.container = element);
  public createBottomRef = (element: HTMLDivElement) =>
    (this.messagesBottom = element);

  public render() {
    return this.state.error ? (
      <p className="error">{this.state.error}</p>
    ) : (
      <React.Fragment>
        <div className="messages-header">Conversation Participants</div>
        <div ref={this.createContainerRef} className="messages-list">
          {this.state.messages.map(message => (
            <Message
              key={message.message_id}
              {...message}
              current_user={this.state.current_user}
            />
          ))}

          {this.state.loading && "Loading messages"}
          {!this.state.messages.length &&
            !this.state.loading &&
            "No messages yet"}
          <div
            ref={(element: HTMLDivElement) => (this.messagesBottom = element)}
          />
        </div>
      </React.Fragment>
    );
  }
}

export { Messages };
