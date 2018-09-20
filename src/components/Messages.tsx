import Axios from "axios";
import * as React from "react";
// import { RouteComponentProps } from "react-router";
import { Message } from "./Message";
import { NewMessage } from "./NewMessage";

interface RouteComponentProps {
  match: {
    params: {
      conversation_id: string;
    };
  };
}

interface IState {
  messages: any[];
}
const initialState = {
  messages: []
};

class Messages extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = initialState;
  }

  public componentDidMount() {
    Axios.get(`/api/conversations/${this.props.match.params.conversation_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(response => {
      console.log(response);
      this.setState({ messages: response.data.messages });
    });
  }

  public render() {
    return (
      <div>
        <h1>Messages</h1>
        {this.state.messages.map(message => (
          <Message key={message.message_id} {...message} />
        ))}
        <NewMessage conversation_id={this.props.match.params.conversation_id} />
      </div>
    );
  }
}

export { Messages };
