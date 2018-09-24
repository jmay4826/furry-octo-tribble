import * as React from "react";
import { Message } from "./Message";

interface IProps {
  conversation_id: string;
  socket: SocketIOClient.Socket;
}

interface IState {
  loading: boolean;
  messages: IMessage[];
}

interface IMessage {
  content: string;
  from_username: string;
  message_id: number;
  sent_at: string;
}

const initialState = {
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
    this.props.socket.on("new message", (messages: IMessage[]) => {
      this.setState({ messages, loading: false });
      this.container.scrollTo(0, this.messagesBottom.offsetTop);
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

  public componentWillUnmount() {
    this.props.socket.close();
  }

  public createContainerRef = (element: HTMLDivElement) =>
    (this.container = element);
  public createBottomRef = (element: HTMLDivElement) =>
    (this.messagesBottom = element);

  public render() {
    return (
      <div
        ref={this.createContainerRef}
        style={{
          height: "60vh",
          overflow: "auto",
          width: "100%"
        }}
      >
        {this.state.messages.map(message => (
          <Message key={message.message_id} {...message} />
        ))}

        {this.state.loading && "Loading messages"}
        {!this.state.messages.length &&
          !this.state.loading &&
          "No messages yet"}
        <div
          ref={(element: HTMLDivElement) => (this.messagesBottom = element)}
        />
      </div>
    );
  }
}

export { Messages };
