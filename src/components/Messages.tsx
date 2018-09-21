// import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import * as io from "socket.io-client";
import { Message } from "./Message";
import { NewMessage } from "./NewMessage";

interface IProps extends RouteComponentProps<{ conversation_id: string }> {}

interface IState {
  messages: any[];
}
const initialState = {
  messages: []
};

class Messages extends React.Component<IProps, IState> {
  public socket: SocketIOClient.Socket;
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public componentDidMount() {
    this.socket = io();
    this.socket.emit("authenticate", {
      conversation_id: this.props.match.params.conversation_id,
      token: localStorage.getItem("token")
    });
    this.socket.on("new message", (messages: any[]) => {
      this.setState({ messages });
    });
  }
  public componentWillUnmount() {
    this.socket.close();
  }

  public render() {
    return (
      <div>
        <h1>Messages</h1>
        {this.state.messages.map(message => (
          <Message key={message.message_id} {...message} />
        ))}
        <NewMessage
          socket={this.socket}
          conversation_id={this.props.match.params.conversation_id}
        />
      </div>
    );
  }
}

export { Messages };
