// import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import * as io from "socket.io-client";
import { Message } from "./Message";
import { NewMessage } from "./NewMessage";

interface IProps extends RouteComponentProps<{ conversation_id: string }> {}

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
      this.setState({ messages, loading: false });
      this.div.scrollTo(0, this.messagesBottom.offsetTop);
    });
  }
  public componentWillUnmount() {
    this.socket.close();
  }

  public createRef = (element: any) => (this.div = element);

  public render() {
    return (
      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center"
      // }}
      >
        <h1>Messages</h1>
        <div
          ref={this.createRef}
          style={{
            borderBottom: "1px solid gray",
            height: "60vh",
            overflow: "auto",
            width: "100%"
          }}
        >
          {this.state.messages.map((message, i, arr) => (
            <Message key={message.message_id} {...message} />
          ))}
          {this.state.loading && "Loading..."}
          {!this.state.messages.length &&
            !this.state.loading &&
            "No messagse yet"}
          <div ref={e => (this.messagesBottom = e)} />
        </div>
        <NewMessage
          socket={this.socket}
          conversation_id={this.props.match.params.conversation_id}
        />
      </div>
    );
  }
}

export { Messages };
