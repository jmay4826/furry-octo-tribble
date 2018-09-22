// import Axios from "axios";
import { Button, TextField } from "@material-ui/core";
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
      value: ""
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

  public addCharacter = (character: string) => () => {
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
    this.setState({ value: "" });
  };

  public render() {
    const style = { textTransform: "initial" } as any;
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "80%"
          }}
        >
          <div>
            <Button style={style} onClick={this.addCharacter("¡")}>
              ¡
            </Button>
            <Button style={style} onClick={this.addCharacter("¿")}>
              ¿
            </Button>
            <Button style={style} onClick={this.addCharacter("Á")}>
              Á
            </Button>
            <Button style={style} onClick={this.addCharacter("á")}>
              á
            </Button>
            <Button style={style} onClick={this.addCharacter("É")}>
              É
            </Button>
            <Button style={style} onClick={this.addCharacter("é")}>
              é
            </Button>
            <Button style={style} onClick={this.addCharacter("Í")}>
              Í
            </Button>
          </div>
          <div>
            <Button style={style} onClick={this.addCharacter("í")}>
              í
            </Button>
            <Button style={style} onClick={this.addCharacter("Ó")}>
              Ó
            </Button>
            <Button style={style} onClick={this.addCharacter("ó")}>
              ó
            </Button>
            <Button style={style} onClick={this.addCharacter("Ú")}>
              Ú
            </Button>
            <Button style={style} onClick={this.addCharacter("ú")}>
              ú
            </Button>
            <Button style={style} onClick={this.addCharacter("Ñ")}>
              Ñ
            </Button>
            <Button style={style} onClick={this.addCharacter("ñ")}>
              ñ
            </Button>
          </div>
        </div>

        <TextField
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
