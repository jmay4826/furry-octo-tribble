import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ConversationPreview } from "./ConversationPreview";

interface IState {
  [key: string]: any;
}

class Dashboard extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      conversations: []
    };
  }

  public componentDidMount() {
    Axios.get("/api/conversations", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        console.log(response);
        this.setState({ conversations: response.data.conversations });
      })
      .catch(err => {
        //   if (err.response.status === 401) {
        //   this.props.history.push("/login");
        // } else {
        console.dir(err);
        // }
      });
  }

  public render() {
    return (
      <div>
        <h1>Conversations</h1>
        {this.state.conversations.map((conversation: any) => (
          <ConversationPreview key={conversation.id} {...conversation} />
        ))}
      </div>
    );
  }
}

export { Dashboard };
