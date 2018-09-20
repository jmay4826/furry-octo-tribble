import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { NewMessage } from "./NewMessage";

interface IState {
  [key: string]: any;
}

class Dashboard extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      messages: []
    };
  }

  public componentDidMount() {
    Axios.get("/api/messages", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        console.log(response);
        this.setState({ messages: response.data.messages });
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
        <h1>Messages</h1>
        {this.state.messages.map((message: any) => (
          <h1 key={message.id}>{JSON.stringify(message)}</h1>
        ))}
        <NewMessage />
      </div>
    );
  }
}

export { Dashboard };
