import Axios from "axios";
import * as React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import * as io from "socket.io-client";
import { ConversationPreview } from "./ConversationPreview";
import { Messages } from "./Messages";
import { NewMessage } from "./NewMessage";

interface IState {
  conversations: IConversation[];
  error?: string;
  filter: string;
  loading: boolean;
}
interface IProps extends RouteComponentProps<{ conversation_id?: string }> {}

class Conversations extends React.Component<IProps, IState> {
  public socket: SocketIOClient.Socket;
  constructor(props: IProps) {
    super(props);
    this.state = {
      conversations: [],
      error: undefined,
      filter: "",
      loading: true
    };
  }

  public async componentDidMount() {
    this.socket = io();
    this.getConversations();
  }

  public getConversations = async () => {
    try {
      const {
        data: { conversations }
      }: { data: { conversations: IConversation[] } } = await Axios.get(
        "/api/conversations",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      this.setState({ conversations, loading: false });
    } catch (e) {
      this.setState({ error: "Error", loading: false });
    }
  };

  public componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }
  public filter = (conversation: IConversation) =>
    conversation.users
      .toString()
      .toLowerCase()
      .indexOf(this.state.filter.toLowerCase()) !== -1;

  public handleChange = ({
    target: { value: filter }
  }: React.ChangeEvent<HTMLInputElement>) => this.setState({ filter });

  public renderConversation = (
    props: RouteComponentProps<{ conversation_id: string }>
  ) =>
    this.socket ? (
      <div className="messages-container">
        <Messages
          /** Adding a key causes React to unmount the component
           * instead of using componentDidUpdate to change content
           * per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
           */
          key={props.match.params.conversation_id + "messages"}
          {...props}
          socket={this.socket}
          refreshConversations={this.getConversations}
        />
        <NewMessage
          key={props.match.params.conversation_id + "newMessage"}
          {...props}
          socket={this.socket}
        />
      </div>
    ) : (
      "Loading"
    );

  public render() {
    return this.state.error ? (
      <p>{this.state.error}</p>
    ) : this.state.conversations.length &&
    !this.props.match.params.conversation_id ? (
      <Redirect
        push={true}
        to={`/conversations/${this.state.conversations[0].id}`}
      />
    ) : (
      <React.Fragment>
        <div className="conversations-list-container">
          <input
            type="text"
            value={this.state.filter}
            placeholder="Filter by username"
            onChange={this.handleChange}
            className="filter"
          />
          <h2>Messages ({this.state.conversations.length})</h2>
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
            {!this.state.loading &&
              !this.state.conversations.length && (
                <div className="conversation-preview" style={{}}>
                  <p className="conversation-preview-users">
                    No conversations yet!
                  </p>
                  <p className="conversation-preview-content">
                    When your instructor assigns a partner to you, your messages
                    will appear here. Check back soon!
                  </p>
                </div>
              )}
          </div>
        </div>

        <Route
          path="/conversations/:conversation_id"
          render={this.renderConversation}
        />
      </React.Fragment>
    );
  }
}

export { Conversations };
