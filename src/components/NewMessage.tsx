// import Axios from "axios";
import * as React from "react";

interface IState {
  [key: string]: any;
}

interface IProps {
  conversation_id: string;
  socket: SocketIOClient.Socket;
}

class NewMessage extends React.Component<IProps, IState> {
  public textarea: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectionEnd: 0,
      selectionStart: 0,
      value: "is this even possible"
    };
  }

  public setRef = (element: any) => {
    this.textarea = element;
  };
  public handleChange = ({
    target: { value }
  }: {
    target: { value: string };
  }) => this.setState({ value });

  public addCharacter = ({ target: { name } }: { target: any }) => {
    this.setState(
      prevState => {
        let value = prevState.value.substring(0, prevState.selectionStart);
        value += name;
        value += prevState.value.substring(
          prevState.selectionEnd,
          prevState.value.length
        );
        const selectionStart = prevState.selectionStart + 1;
        const selectionEnd = prevState.selectionStart + 1;
        return { value, selectionStart, selectionEnd };
      },
      () => {
        this.textarea.focus();
        this.textarea.setSelectionRange(
          this.state.selectionStart,
          this.state.selectionEnd
        );
      }
    );
  };

  public handleSelect = ({ target: { selectionEnd, selectionStart } }: any) => {
    this.setState({ selectionEnd, selectionStart });
  };

  public sendMessage = () => {
    this.props.socket.emit("message sent", {
      content: this.state.value,
      conversation_id: this.props.conversation_id
    });
  };

  public render() {
    return (
      <div className="new-message-container">
        <div className="message-icons">
          <button name="á" onClick={this.addCharacter}>
            á
          </button>
          <button name="é" onClick={this.addCharacter}>
            é
          </button>
          <button name="í" onClick={this.addCharacter}>
            í
          </button>
          <button name="ó" onClick={this.addCharacter}>
            ó
          </button>
          <button name="ú" onClick={this.addCharacter}>
            ú
          </button>
          <button name="ñ" onClick={this.addCharacter}>
            ñ
          </button>
          <button name="¿" onClick={this.addCharacter}>
            ¿
          </button>
        </div>
        <div className="message-icons">
          <button name="Á" onClick={this.addCharacter}>
            Á
          </button>
          <button name="É" onClick={this.addCharacter}>
            É
          </button>
          <button name="Í" onClick={this.addCharacter}>
            Í
          </button>
          <button name="Ó" onClick={this.addCharacter}>
            Ó
          </button>
          <button name="Ú" onClick={this.addCharacter}>
            Ú
          </button>
          <button name="Ñ" onClick={this.addCharacter}>
            Ñ
          </button>
          <button name="¡" onClick={this.addCharacter}>
            ¡
          </button>
        </div>
        <textarea
          className="new-message"
          ref={this.setRef}
          onSelect={this.handleSelect}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

export { NewMessage };
