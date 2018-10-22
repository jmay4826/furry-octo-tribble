import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { AccentButtons, defaultAccents as accents } from "./AccentButtons";
import { NewMessageStyles } from "../styles/NewMessageStyles";
import { Mutation, MutationFn } from "react-apollo";
import gql from "graphql-tag";
import { GET_MESSAGES_QUERY } from "./Messages";
import * as NProgress from "nprogress";
import { GET_CONVERSATIONS_QUERY } from "./Conversations";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($content: String!, $conversation_id: Int!) {
    createMessage(content: $content, conversation_id: $conversation_id) {
      id
      content
      sent_at
      from {
        id
        first_name
      }
      conversation {
        id
        user_conversations {
          user {
            first_name
          }
        }
      }
    }
  }
`;

interface IProps {
  conversation_id: number;
}

interface IState {
  accent: boolean;
  error: boolean;
  selectionEnd: number;
  selectionStart: number;
  sendOnEnter: boolean;
  value: string;
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
  public textarea: React.RefObject<HTMLTextAreaElement>;
  public sendMessage: MutationFn<
    any,
    {
      content: string;
      conversation_id: number;
    }
  >;

  constructor(props: IProps) {
    super(props);
    this.state = initialState;
    this.textarea = React.createRef();
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
        if (this.textarea.current) {
          this.textarea.current.focus();
          this.textarea.current.setSelectionRange(
            this.state.selectionStart,
            this.state.selectionEnd
          );
        }
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
      e.preventDefault();

      return this.handleSubmit();
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

  public handleSubmit = async () => {
    if (this.state.value) {
      NProgress.start();
      this.setState({ ...initialState, sendOnEnter: this.state.sendOnEnter });
      await this.sendMessage();
      NProgress.done();
    } else {
      this.setState({ error: true });
    }
  };

  public render() {
    return (
      <Mutation
        optimisticResponse={{
          __typename: "Mutation",
          createMessage: {
            __typename: "Message",
            id: -1,
            content: this.state.value,
            sent_at: Date.now(),
            from: {
              __typename: "Appuser",
              id: -1,
              first_name: "Sending..."
            }
          }
        }}
        update={(proxy, data) => {
          const current = proxy.readQuery({
            query: GET_MESSAGES_QUERY,
            variables: {
              where: {
                conversation: { id: +this.props.conversation_id }
              }
            }
          }) as { messages: any };
          if (data.data && current) {
            current.messages.push(data.data.createMessage);
            proxy.writeQuery({
              query: GET_MESSAGES_QUERY,
              data: current,
              variables: {
                where: {
                  conversation: { id: this.props.conversation_id }
                }
              }
            });
          }
        }}
        mutation={SEND_MESSAGE_MUTATION}
        variables={{
          content: this.state.value,
          conversation_id: this.props.conversation_id
        }}
        refetchQueries={["GET_CONVERSATIONS_QUERY"]}
      >
        {(sendMessage, { loading, error, data }) => {
          this.sendMessage = sendMessage;
          return (
            <div className="new-message-container">
              <AccentButtons handleClick={this.handleAccentClick} />
              <div className="hint">
                <p>
                  Hint: Press ` then a letter to add an accent mark. Ex. ` + a =
                  á
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
                  ref={this.textarea}
                  onSelect={this.handleSelect}
                  value={this.state.value}
                  onChange={this.handleChange}
                  rows={4}
                  style={this.state.error ? { border: "1px solid red" } : {}}
                />
                <button onClick={this.handleSubmit} className="send-button">
                  <FontAwesomeIcon icon={faArrowRight} size="3x" />
                </button>
              </div>
              <style jsx>{NewMessageStyles}</style>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export { NewMessage };
