import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { AccentButtons, defaultAccents as accents } from "./AccentButtons";

interface IState {
  accent: boolean;
  error: boolean;
  selectionEnd: number;
  selectionStart: number;
  sendOnEnter: boolean;
  value: string;
}

interface IProps {
  conversation_id: string;
  socket: SocketIOClient.Socket;
}

const initialState: IState = {
  accent: false,
  error: false,
  selectionEnd: 0,
  selectionStart: 0,
  sendOnEnter: true,
  value: ""
};

class NewMessage extends React.Component<IProps, IState> {
  public textarea: HTMLTextAreaElement;

  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public addCharacter = (character: string) =>
    this.setState(
      prevState => {
        let value = prevState.value.substring(0, prevState.selectionStart);
        value += character;
        value += prevState.value.substring(
          prevState.selectionEnd,
          prevState.value.length
        );
        const selectionStart = prevState.selectionStart + 1;
        const selectionEnd = prevState.selectionStart + 1;
        return { value, selectionStart, selectionEnd, accent: false };
      },
      () => {
        this.textarea.focus();
        this.textarea.setSelectionRange(
          this.state.selectionStart,
          this.state.selectionEnd
        );
      }
    );

  public handleAccentClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    this.addCharacter(e.currentTarget.name);

  public handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLTextAreaElement>) =>
    this.setState({ value, error: false });

  public handleCheck = ({
    currentTarget: { checked: sendOnEnter }
  }: React.SyntheticEvent<HTMLInputElement>) => this.setState({ sendOnEnter });

  public handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (this.state.sendOnEnter && e.which === 13) {
      return this.sendMessage();
    }
    if (e.which === 96) {
      e.preventDefault();
      return this.setState({ accent: true });
    } else if (this.state.accent) {
      e.preventDefault();
      return this.addCharacter(accents[e.key] || e.key);
    }
  };

  public handleSelect = ({
    currentTarget: { selectionEnd, selectionStart }
  }: React.SyntheticEvent<HTMLTextAreaElement>) =>
    this.setState({
      selectionEnd,
      selectionStart
    });

  public sendMessage = () => {
    if (this.state.value) {
      this.props.socket.emit("message sent", {
        content: this.state.value,
        conversation_id: this.props.conversation_id
      });
      this.setState(initialState);
    } else {
      this.setState({ error: true });
    }
  };

  public setRef = (element: HTMLTextAreaElement) => (this.textarea = element);

  public render() {
    return (
      <div className="new-message-container">
        <AccentButtons handleClick={this.handleAccentClick} />
        <div className="hint">
          <p>
            Hint: Press ` then a letter to add an accent mark. Ex. ` + a = á
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={this.state.sendOnEnter}
                onChange={this.handleCheck}
              />{" "}
              Press Enter to send messages
            </label>
          </p>
        </div>
        <div className="new-message-controls">
          <textarea
            onKeyPress={this.handleKey}
            required={true}
            placeholder="Enter message"
            ref={this.setRef}
            onSelect={this.handleSelect}
            value={this.state.value}
            onChange={this.handleChange}
            rows={4}
            style={this.state.error ? { border: "1px solid red" } : {}}
          />
          <button onClick={this.sendMessage} className="send-button">
            <FontAwesomeIcon icon={faArrowRight} size="3x" />
          </button>
        </div>
      </div>
    );
  }
}

export { NewMessage };
