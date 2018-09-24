import { Button, TextField } from "@material-ui/core";
import * as React from "react";
import { AccentButtons, defaultAccents as accents } from "./AccentButtons";

interface IState {
  accent: boolean;
  error: boolean;
  selectionEnd: number;
  selectionStart: number;
  value: string;
}

interface IProps {
  conversation_id: string;
  socket: SocketIOClient.Socket;
}

interface ISelectionEvent extends React.SyntheticEvent<HTMLDivElement> {
  target: EventTarget & HTMLDivElement & HTMLTextAreaElement;
}

const initialState: IState = {
  accent: false,
  error: false,
  selectionEnd: 0,
  selectionStart: 0,
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

  public handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.which === 96) {
      e.preventDefault();
      this.setState({ accent: true });
    } else if (this.state.accent) {
      e.preventDefault();
      this.addCharacter(accents[e.key] || e.key);
    }
  };

  public handleSelect = ({
    target: { selectionEnd, selectionStart }
  }: ISelectionEvent) =>
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
      <div
        style={{
          alignItems: "center",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <AccentButtons handleClick={this.handleAccentClick} />
        <TextField
          error={this.state.error}
          onKeyPress={this.handleKey}
          required={true}
          placeholder="Enter message"
          style={{ minWidth: "80%", margin: "0 auto" }}
          variant="outlined"
          multiline={true}
          inputRef={this.setRef}
          onSelect={this.handleSelect}
          value={this.state.value}
          onChange={this.handleChange}
          rows={8}
        />

        <Button onClick={this.sendMessage}>Send</Button>
      </div>
    );
  }
}

export { NewMessage };
