import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ConversationPreview } from "./ConversationPreview";

interface IState {
  [key: string]: any;
}
interface IProps extends RouteComponentProps {}

class Dashboard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      conversations: [],
      error: undefined
    };
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

  public render() {
    return (
      <div>
        <h1>Conversations</h1>
        {this.state.conversations.map((conversation: any) => (
          <ConversationPreview key={conversation.id} {...conversation} />
        ))}
        <p>{JSON.stringify(this.state.error)}</p>
      </div>
    );
  }
}

export { Dashboard };
