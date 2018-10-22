import * as React from "react";
import { Message } from "./Message";
import { NewMessage } from "./NewMessage";
import { MainContentStyles } from "../styles/MainContentStyles";

interface IProps {
  messages: [IMessage];
  conversation_id: number;
}

export class MessagesList extends React.Component<IProps> {
  public container: React.RefObject<HTMLDivElement>;
  public messagesBottom: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);
    this.container = React.createRef();
    this.messagesBottom = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    if (this.container.current && this.messagesBottom.current) {
      this.messagesBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  public render() {
    return (
      <React.Fragment>
        <div ref={this.container} className="main-content">
          {this.props.messages.map(message => (
            <Message key={message.id} {...message} />
          ))}
          <div ref={this.messagesBottom} />
        </div>
        <NewMessage conversation_id={this.props.conversation_id} />
        <style jsx>{MainContentStyles}</style>
      </React.Fragment>
    );
  }
}
