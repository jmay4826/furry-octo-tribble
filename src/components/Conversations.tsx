import { List } from "@material-ui/core";
import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import * as io from "socket.io-client";
import { ConversationPreview } from "./ConversationPreview";
import { Messages } from "./Messages";
import { NewMessage } from "./NewMessage";

interface IState {
  [key: string]: any;
}
interface IProps extends RouteComponentProps<{ conversation_id: string }> {}

class Conversations extends React.Component<IProps, IState> {
  public socket: SocketIOClient.Socket;
  constructor(props: IProps) {
    super(props);
    this.state = {
      conversations: [],
      error: undefined
    };
    this.socket = io();
  }

  public componentDidMount() {
    Axios.get("/api/conversations", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        this.setState({ conversations: response.data.conversations });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  public componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }

  public render() {
    console.log(this.props);
    return (
      <div>
        <h1>Messages</h1>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <List>
              {this.state.conversations.map((conversation: any) => (
                <ConversationPreview
                  key={conversation.id}
                  {...conversation}
                  selected={this.props.match.params.conversation_id}
                />
              ))}
            </List>
          </div>
          {this.props.match.params.conversation_id && (
            <div style={{ flexGrow: 5 }}>
              <Messages
                socket={this.socket}
                conversation_id={this.props.match.params.conversation_id}
              />
            </div>
          )}
        </div>
        {this.props.match.params.conversation_id && (
          <NewMessage
            socket={this.socket}
            conversation_id={this.props.match.params.conversation_id}
          />
        )}
        <p>{JSON.stringify(this.state.error)}</p>
      </div>
    );
  }
}

// Conversations = withRouter(Conversations)

export { Conversations };
