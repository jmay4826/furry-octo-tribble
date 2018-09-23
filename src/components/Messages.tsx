import * as React from "react";
import { Message } from "./Message";

interface IProps {
  conversation_id: string;
  socket: SocketIOClient.Socket;
}

interface IState {
  loading: boolean;
  messages: any[];
}
const initialState = {
  loading: true,
  messages: []
};

class Messages extends React.Component<IProps, IState> {
  public div: any;
  public messagesBottom: any;

  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public componentDidMount() {
    this.props.socket.emit("authenticate", {
      conversation_id: this.props.conversation_id,
      token: localStorage.getItem("token")
    });
    this.props.socket.on("new message", (messages: any[]) => {
      this.setState({ messages, loading: false });
      this.div.scrollTo(0, this.messagesBottom.offsetTop);
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

  public createRef = (element: any) => (this.div = element);

  public render() {
    return (
      <div>
        <div
          ref={this.createRef}
          style={{
            height: "60vh",
            overflow: "auto",
            width: "100%"
          }}
        >
          {this.state.messages.map(message => (
            <Message key={message.message_id} {...message} />
          ))}

          {this.state.loading && <Message from_username="Loading..." />}
          {!this.state.messages.length &&
            !this.state.loading &&
            "No messagse yet"}
          <div ref={e => (this.messagesBottom = e)} />
        </div>
      </div>
    );
  }
}

export { Messages };
