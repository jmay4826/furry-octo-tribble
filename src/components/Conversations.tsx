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
  filter: string;
}
interface IProps extends RouteComponentProps<{ conversation_id?: string }> {}

class Conversations extends React.Component<IProps, IState> {
  public socket: SocketIOClient.Socket;
  constructor(props: IProps) {
    super(props);
    this.state = {
      conversations: [],
      error: undefined,
      filter: ""
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

    // TODO:
    // Update conversations when a new messages comes in
  }

  public componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }
  public filter = (conversation: IConversation) =>
    conversation.users.toString().indexOf(this.state.filter) !== -1;

  public handleChange = ({
    target: { value: filter }
  }: React.ChangeEvent<HTMLInputElement>) => this.setState({ filter });

  public render() {
    return this.state.error ? (
      <p>{this.state.error}</p>
    ) : (
      <div className="conversations-container">
        {" "}
        {/* Conversations Page Container div */}
        <div className="conversations-list-container">
          {" "}
          {/* Conversations Container div */}
          <input
            type="text"
            value={this.state.filter}
            placeholder="Search by username"
            onChange={this.handleChange}
            className="filter"
          />
          <h2>Messages</h2>
          <div className="conversations-list">
            {this.state.conversations.filter(this.filter).map(conversation => (
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
          </div>
        </div>
        {this.props.match.params.conversation_id && (
          <div style={{ width: "75%" }}>
            <Messages
              socket={this.socket}
              conversation_id={this.props.match.params.conversation_id}
            />
            <NewMessage
              socket={this.socket}
              conversation_id={this.props.match.params.conversation_id}
            />
          </div>
        )}
      </div>
    );
  }
}

export { Conversations };
