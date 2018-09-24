import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import * as io from "socket.io-client";
import { ConversationPreview } from "./ConversationPreview";
import { Messages } from "./Messages";
import { NewMessage } from "./NewMessage";

export interface IConversation {
  id: number;
  sent_at: string;
  users: string[];
}

interface IState {
  conversations: IConversation[];
  error?: string;
}
interface IProps extends RouteComponentProps<{ conversation_id?: string }> {}

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

  public async componentDidMount() {
    try {
      const {
        data: { conversations }
      }: { data: { conversations: IConversation[] } } = await Axios.get(
        "/api/conversations",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      this.setState({ conversations });
    } catch (e) {
      this.setState({ error: "Error" });
    }
  }

  public componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }

  public render() {
    return (
      <div>
        <h1>Messages</h1>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <List>
              {this.state.conversations.map(conversation => (
                <ConversationPreview
                  key={conversation.id}
                  {...conversation}
                  selected={
                    this.props.match.params.conversation_id
                      ? +this.props.match.params.conversation_id ===
                        conversation.id
                      : false
                  }
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
        <Typography color="error">{this.state.error}</Typography>
      </div>
    );
  }
}

export { Conversations };
